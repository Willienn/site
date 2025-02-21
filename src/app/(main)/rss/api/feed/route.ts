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

// Helper: Check if the cache is still valid
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION
}

// Cache handling
async function setCache(feedData: Feed, slug: string): Promise<void> {
  const cacheFilePath = path.join(CACHE_DIR, `${slug}.json`)
  await fs.mkdir(CACHE_DIR, { recursive: true })
  await fs.writeFile(
    cacheFilePath,
    JSON.stringify({ data: feedData, timestamp: Date.now() })
  )
}

async function getCache(slug: string): Promise<CachedFeed | null> {
  const cacheFilePath = path.join(CACHE_DIR, `${slug}.json`)
  try {
    return JSON.parse(await fs.readFile(cacheFilePath, "utf-8")) as CachedFeed
  } catch (err) {
    console.log(err)
    return null
  }
}

// Feed processing
function addImageToFeedItem(item: FeedItem): FeedItem {
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
  feed.items = feed.items.map(addImageToFeedItem)
  await setCache(feed, slug)
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

async function downloadFeedImage(
  imageUrl: string,
  slug: string
): Promise<string> {
  // Consistently save and return as slug.jpg
  const imagePath = path.join(process.cwd(), "public/rss-images", `${slug}.jpg`)
  try {
    await fs.access(imagePath) // Check if image already exists
    return `/rss-images/${slug}.jpg`
  } catch {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }
    const buffer = await response.arrayBuffer()
    await fs.mkdir(path.dirname(imagePath), { recursive: true })
    await fs.writeFile(imagePath, Buffer.from(buffer))
    return `/rss-images/${slug}.jpg`
  }
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const slug = searchParams.get("slug")
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)

  if (!url || !slug) {
    return new Response(
      JSON.stringify({ error: "Feed URL and slug are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  try {
    const cachedFeed = await getCache(slug)
    let feed: Feed

    if (cachedFeed) {
      feed = cachedFeed.data
      // If cache is stale, refresh it in the background but still use the cached data
      if (!isCacheValid(cachedFeed.timestamp)) {
        processFeed(url, slug).catch(console.error)
      } else if (Date.now() - cachedFeed.timestamp > CACHE_DURATION / 2) {
        // Optionally trigger a background refresh if cache is half-expired
        processFeed(url, slug).catch(console.error)
      }
    } else {
      feed = await processFeed(url, slug)
    }

    const { items, pagination } = getPaginatedItems(feed, { page, limit })
    // Trigger image download if an image URL exists
    if ((feed.image?.url || feed.itunes?.image) && slug) {
      downloadFeedImage(feed.image?.url || feed.itunes?.image, slug).catch(
        console.error
      )
    }

    const response: FeedResponse = { items, pagination }

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
    return new Response(
      JSON.stringify({
        error: `Failed to fetch feed, reason: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
