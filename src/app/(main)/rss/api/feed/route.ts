// app/api/feed/route.js
import Parser from 'rss-parser';

const parser = new Parser();
let cache = {};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "Feed URL is required" }), { status: 400 });
  }

  // If we have a cached ETag for this URL, use it for the conditional request
  const cachedFeed = cache[url];
  const headers = cachedFeed && cachedFeed.etag
    ? { 'If-None-Match': cachedFeed.etag }
    : {};

  try {
    const response = await fetch(url, { headers });

    if (response.status === 304 && cachedFeed) {
      // Feed has not changed; use the cached version
      return new Response(JSON.stringify(cachedFeed.data), {
        status: 200,
        headers: { 'Cache-Control': 'public, max-age=432000' }, // Cache for 5 days
      });
    }

    // Parse new feed data
    const feed = await parser.parseURL(url);

    // Extract items and include images
    feed.items = feed.items.map((item) => ({
      ...item,
      image: item.itunes?.image || item.enclosure?.url || item["media:thumbnail"]?.url || null,
    }));

    const etag = response.headers.get('ETag');

    // Update cache with new data and ETag
    cache[url] = {
      data: feed,
      etag,
      timestamp: Date.now(),
    };

    return new Response(JSON.stringify(feed), {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=432000', // Cache for 5 days if no new content
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch feed" }), { status: 500 });
  }
}
