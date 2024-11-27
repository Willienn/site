import { posts } from "@/lib/posts/metadata" // Import posts metadata
import { feeds } from "@/lib/rss/metadata"

export default async function sitemap() {
  const baseUrl = "https://dailycodes.dev"

  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/work`, lastModified: new Date().toISOString() },
  ]

  const rssRoutes = feeds.map((feed) => ({
    url: `${baseUrl}/rss/${feed.slug}`,
    lastModified: new Date().toISOString(),
  }))

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
  }))

  const allRoutes = [...staticRoutes, ...rssRoutes, ...postRoutes]

  return allRoutes.map((route) => ({
    loc: route.url,
    lastmod: route.lastModified,
  }))
}
