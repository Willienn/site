import { posts } from "@/lib/posts/metadata" // Import posts metadata
import { feeds } from "@/lib/rss/metadata"
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dailycodes.dev"

  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: "yearly",
    },
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date().toISOString(),
    //   changeFrequency: "monthly",
    //   priority: 1,
    // },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",

      priority: 1,
    },
    {
      url: `${baseUrl}/rss`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ] as MetadataRoute.Sitemap

  const rssRoutes: MetadataRoute.Sitemap = feeds.map((feed) => ({
    url: `${baseUrl}/rss/${feed.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
    changeFrequency: "yearly",
    priority: 0.7,
  }))

  const allRoutes = [...staticRoutes, ...rssRoutes, ...postRoutes]

  return allRoutes.map(({ url, lastModified, priority, changeFrequency }) => ({
    url,
    lastModified,
    priority,
    changeFrequency,
  }))
}
