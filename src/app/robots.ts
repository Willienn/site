import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/_next/static/media",
        "/_next/static/css",
        "/_next/static/chunks",
      ],
      disallow: [
        "/_next/",
        "/404.html",
      ],
    },
    sitemap: "https://dailycodes.dev/sitemap.xml",
  }
}
