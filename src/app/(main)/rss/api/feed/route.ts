import fs from "fs"
import fetch from "node-fetch" // Ensure node-fetch is available for server environments
import path from "path"
import Parser from "rss-parser"

const parser = new Parser()
const CACHE_DIR = path.join("/tmp", "cache") // Directory to store cached feeds
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

// Helper function to save the feed to cache
function saveFeedToCache(feedData, slug) {
  const cacheFilePath = path.join(CACHE_DIR, `${slug}.json`)
  fs.mkdirSync(CACHE_DIR, { recursive: true })
  fs.writeFileSync(
    cacheFilePath,
    JSON.stringify({ data: feedData, timestamp: Date.now() })
  )
}

// Helper function to read feed from cache if it exists and is not expired
function readFeedFromCache(slug) {
  const cacheFilePath = path.join(CACHE_DIR, `${slug}.json`)
  if (fs.existsSync(cacheFilePath)) {
    const cachedData = JSON.parse(fs.readFileSync(cacheFilePath, "utf-8"))
    const isCacheValid = Date.now() - cachedData.timestamp < CACHE_DURATION
    return isCacheValid ? cachedData.data : null
  }
  return null
}

// Helper function to download the main feed image and save to public/rss-images/
async function downloadFeedImage(imageUrl, slug) {
  const response = await fetch(imageUrl)
  if (!response.ok)
    throw new Error(`Failed to fetch image: ${response.statusText}`)

  const buffer = await response.buffer()
  const imagePath = path.join(
    process.cwd(),
    "public/rss-images",
    `${slug}-logo.jpg`
  )

  fs.mkdirSync(path.dirname(imagePath), { recursive: true })
  fs.writeFileSync(imagePath, buffer)

  return `/rss-images/${slug}.jpg`
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")
  const slug = searchParams.get("slug")
  const page = parseInt(searchParams.get("page") || "1", 10) // Current page number
  const limit = parseInt(searchParams.get("limit") || "10", 10) // Episodes per page

  if (!url) {
    return new Response(JSON.stringify({ error: "Feed URL is required" }), {
      status: 400,
    })
  }

  try {
    // Check if the feed is cached
    const cachedFeed = readFeedFromCache(slug)
    let feed = cachedFeed

    // If no cached data, fetch and cache it
    if (!cachedFeed) {
      feed = await parser.parseURL(url)
      feed.items = feed.items.map((item) => ({
        ...item,
        image:
          item.itunes?.image ||
          item.enclosure?.url ||
          item["media:thumbnail"]?.url ||
          null,
      }))
      // downloadFeedImage()
      saveFeedToCache(feed, slug)
    }

    // Download and save the main feed image if available
    if ((feed.image?.url || feed?.itunes?.image) && slug) {
      try {
        await downloadFeedImage(feed?.image?.url || feed?.itunes?.image, slug)
      } catch (err) {
        console.error(`Failed to download feed image:`, err)
      }
    } else if (!slug)
      console.warn(
        "slug not found skipping image download. Podcast cover maybe outdated"
      )

    // Calculate pagination details
    const totalItems = feed.items.length
    const totalPages = Math.ceil(totalItems / limit)
    const offset = (page - 1) * limit
    const paginatedItems = feed.items.slice(offset, offset + limit)

    // Return paginated items along with pagination metadata
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
      {
        status: 500,
      }
    )
  }
}
