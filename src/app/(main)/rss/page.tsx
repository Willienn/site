import { feeds } from "@/lib/rss/metadata"
import { Metadata } from "next"

import ClientPage from "./page.client"

const nonoWords = ["the", "and", "of", "a", "to", "in"] // "nono" from nono square. Get it ? no ? ahh...
const keywords = Array.from(
  new Set(
    feeds.flatMap((feed) =>
      [feed.title, ...feed.title.split(" ")].filter(
        (word) => !nonoWords.includes(word.toLowerCase()) && word.length > 2
      )
    )
  )
)
export const metadata: Metadata = {
  title: "Daily Codes - Podcasts",
  description:
    "Discover highly recommended podcasts and latest episodes on Daily Codes.",
  keywords: [
    "daily codes",
    "daily",
    "codes",
    "podcast",
    "podcasts",
    "willien",
    "willien muniz",
    ...keywords,
  ],
  openGraph: {
    title: "Daily Codes - Podcasts",
    description:
      "Discover highly recommended podcasts and latest episodes on Daily Codes.",
    url: "https://dailycodes.dev/rss",
    siteName: "Daily Codes",
    images: [
      {
        url: "https://dailycodes.dev/open-graph.png",
        width: 150,
        height: 150,
      },
    ],
    locale: "en_US",
    type: "website",
  },
}
export default function Page() {
  return <ClientPage />
}
