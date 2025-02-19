import fs from "fs/promises"
import fetch from "node-fetch"
import path from "path"
import Parser from "rss-parser"

// Types
interface FeedItem {
  title?: string
  link?: string
  content?: string
  contentSnippet?: string
  guid?: string
  isoDate?: string
  pubDate?: string
  creator?: string
  image?: string | null
  itunes?: {
    image?: string
  }
  enclosure?: {
    url: string
  }
  "media:thumbnail"?: {
    url: string
  }
  [key: string]: any
}

interface Feed {
  items: FeedItem[]
  title?: string
  description?: string
  image?: {
    url: string
  }
  itunes?: {
    image?: string
  }
  [key: string]: any
}

interface CachedFeed {
  data: Feed
  timestamp: number
}

interface PaginationParams {
  page: number
  limit: number
}

interface PaginationResult {
  totalItems: number
  totalPages: number
  currentPage: number
  itemsPerPage: number
}

interface FeedResponse {
  items: FeedItem[]
  pagination: PaginationResult
}

// Constants
const parser = new Parser()
const CACHE_DIR = path.join("/tmp", "cache")
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Cache handling
async function saveToCache(feedData: Feed, slug: string): Promise<any> {
  const cacheFilePath = path.join(CACHE_DIR, `${slug}.json`)
  await fs.mkdir(CACHE_DIR, { recursive: true })
  await fs.writeFile(
    cacheFilePath,
    JSON.stringify({ data: feedData, timestamp: Date.now() })
  )
}
async function readFromCache(slug: string): Promise<Feed | null> {
  const cacheFilePath = path.join(CACHE_DIR, `${slug}.json`)
  try {
    const cachedData: CachedFeed = JSON.parse(
      await fs.readFile(cacheFilePath, "utf-8")
    ) as CachedFeed
    return Date.now() - cachedData.timestamp < CACHE_DURATION
      ? cachedData.data
      : null
  } catch {
    return null
  }
}

// Feed processing
function enrichItemWithImage(item: FeedItem): FeedItem {
  return {
    ...item,
    image:
      item.itunes?.image ||
      item.enclosure?.url ||
      item["media:thumbnail"]?.url ||
      null,
  }
}

async function processFeed(url: string, slug: string): Promise<Feed> {
  const feed = await parser.parseURL(url)
  feed.items = feed.items.map(enrichItemWithImage)
  await saveToCache(feed, slug)
  return feed
}

function getPaginatedItems(
  feed: Feed,
  { page, limit }: PaginationParams
): {
  items: FeedItem[]
  pagination: PaginationResult
} {
  const totalItems = feed.items.length
  const totalPages = Math.ceil(totalItems / limit)
  const offset = (page - 1) * limit
  const paginatedItems = feed.items.slice(offset, offset + limit)

  return {
    items: paginatedItems,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    },
  }
}

async function downloadFeedImage(imageUrl?: string, slug?: string) {
  if (!imageUrl) {
    throw new Error("Image URL is required")
  } else if (!slug) {
    throw new Error("Slug is required")
  }
  const imagePath = path.join(
    process.cwd(),
    "public/rss-images",
    `${slug}-logo.jpg`
  )

  try {
    await fs.access(imagePath) // Check if image already exists
    return `/rss-images/${slug}.jpg`
  } catch {
    const response = await fetch(imageUrl)
    if (!response.ok)
      throw new Error(`Failed to fetch image: ${response.statusText}`)

    const buffer = await response.arrayBuffer()
    await fs.mkdir(path.dirname(imagePath), { recursive: true })
    await fs.writeFile(imagePath, Buffer.from(buffer))

    return `/rss-images/${slug}.jpg`
  }
}

// Main handler
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const slug = searchParams.get("slug")
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)

  if (!url || !slug) {
    return new Response(
      JSON.stringify({ error: "Feed URL and slug are required" }),
      { status: 400 }
    )
  }

  try {
    let feed = await readFromCache(slug)

    if (!feed) {
      feed = await processFeed(url, slug)
    } else if (Date.now() - feed.timestamp > CACHE_DURATION) {
      // Refresh cache in background without blocking response
      processFeed(url, slug).catch(console.error)
    }

    const { items, pagination } = getPaginatedItems(feed, {
      page,
      limit,
    })

    if ((feed.image?.url || feed?.itunes?.image) && slug) {
      downloadFeedImage(feed?.image?.url || feed?.itunes?.image, slug).catch(
        console.error
      )
    }

    const response: FeedResponse = {
      items,
      pagination,
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, s-maxage=432000",
        "CDN-Cache-Control": "public, s-maxage=432000",
        Vary: "Accept-Encoding",
      },
    })
  } catch (error) {
    console.error("Feed fetch error:", error)
    throw new Error(
      JSON.stringify({
        status: 500,
        error: `Failed to fetch feed, reason: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    )
  }
}
