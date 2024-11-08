import fs from "fs/promises" // Use async fs methods
import fetch from "node-fetch"
import path from "path"
import Parser from "rss-parser"

const parser = new Parser()
const CACHE_DIR = path.join("/tmp", "cache")
const CACHE_DURATION = 5 * 60 * 1000

async function saveFeedToCache(feedData, slug) {
  const cacheFilePath = path.join(CACHE_DIR, `${slug}.json`)
  await fs.mkdir(CACHE_DIR, { recursive: true })
  await fs.writeFile(
    cacheFilePath,
    JSON.stringify({ data: feedData, timestamp: Date.now() })
  )
}

async function readFeedFromCache(slug) {
  const cacheFilePath = path.join(CACHE_DIR, `${slug}.json`)
  try {
    const cachedData = JSON.parse(await fs.readFile(cacheFilePath, "utf-8"))
    return Date.now() - cachedData.timestamp < CACHE_DURATION
      ? cachedData.data
      : null
  } catch {
    return null
  }
}

async function downloadFeedImage(imageUrl, slug) {
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

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const slug = searchParams.get("slug")
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)

  if (!url) {
    return new Response(JSON.stringify({ error: "Feed URL is required" }), {
      status: 400,
    })
  }

  try {
    let feed = await readFeedFromCache(slug)

    if (!feed) {
      feed = await parser.parseURL(url)
      feed.items = feed.items.map((item) => ({
        ...item,
        image:
          item.itunes?.image ||
          item.enclosure?.url ||
          item["media:thumbnail"]?.url ||
          null,
      }))
      saveFeedToCache(feed, slug)
    }

    if ((feed.image?.url || feed?.itunes?.image) && slug) {
      downloadFeedImage(feed.image.url || feed.itunes.image, slug).catch(
        console.error
      )
    }

    const totalItems = feed.items.length
    const totalPages = Math.ceil(totalItems / limit)
    const offset = (page - 1) * limit
    const paginatedItems = feed.items.slice(offset, offset + limit)

    return new Response(
      JSON.stringify({
        items: paginatedItems,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
        },
      }),
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, max-age=0, s-maxage=432000, stale-while-revalidate=432000",
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to fetch feed, reason: ${error}` }),
      { status: 500 }
    )
  }
}
