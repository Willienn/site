import fs from "fs/promises"
import fetch from "node-fetch"
import path from "path"
import Parser from "rss-parser"

const parser = new Parser()
const CACHE_DIR = path.join("/tmp", "cache")
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const IMAGE_DIR = path.join(process.cwd(), "public", "rss-images")

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
  const imagePath = path.join(IMAGE_DIR, `${slug}-logo.jpg`)
  try {
    await fs.access(imagePath)
    return `/rss-images/${slug}-logo.jpg`
  } catch {
    try {
      const response = await fetch(imageUrl, { method: "HEAD" })
      if (!response.ok)
        throw new Error(`Failed to fetch image: ${response.statusText}`)

      const imageBuffer = await response.buffer()
      await fs.mkdir(IMAGE_DIR, { recursive: true })
      await fs.writeFile(imagePath, imageBuffer)

      return `/rss-images/${slug}-logo.jpg`
    } catch (err) {
      console.error("Error downloading image:", err)
      return null
    }
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
      await saveFeedToCache(feed, slug)
    }

    const imagePromise =
      (feed.image?.url || feed?.itunes?.image) && slug
        ? downloadFeedImage(feed.image.url || feed.itunes.image, slug).catch(
            console.error
          )
        : Promise.resolve(null)

    const [imagePath] = await Promise.all([imagePromise])

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
        imagePath,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "public, max-age=0, s-maxage=432000, stale-while-revalidate=432000",
        },
      }
    )
  } catch (error) {
    console.error("Feed fetch error:", error)
    return new Response(
      JSON.stringify({
        error: `Failed to fetch feed, reason: ${error.message}`,
      }),
      { status: 500 }
    )
  }
}
