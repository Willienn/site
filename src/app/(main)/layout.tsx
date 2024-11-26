import Footer from "@/components/footer"
import Nav from "@/components/nav"
import { Metadata } from "next"
import { ReactNode } from "react"
import "./global.css"

export const metadata: Metadata = {
  title: "Daily Codes - Web Development, Podcasts, and Poems",
  description:
    "Discover Daily Codes, a personal blog by Willien Muniz. Here you may find insights on programming, web development, creative coding, my favorite podcasts, and poetry.",
  keywords: [
    "Daily Codes",
    "personal blog",
    "programming",
    "web development",
    "poems",
    "podcasts",
    "darknet diaries",
    "smashing security",
    "developer blog",
    "Next.js",
    "Next.js 13",
    "Next.js 14",
    "Willien Muniz",
    "web developer",
    "web programmer",
    "progamador web",
    "creative coding",
    "developer journey",
  ],
  verification: {
    google: "a9WvUWUgrdGoNizhM8stU7ycvk83LEMaODs_8wXyw0M",
  },
  openGraph: {
    title: "Daily Codes - Web Development, Podcasts, and Poems",
    description:
      "Discover Daily Codes, a personal blog by Willien Muniz. Here you may find insights on programming, web development, creative coding, my favorite podcasts, and poetry.",
    url: "https://dailycodes.dev",
    siteName: "Daily Codes",
    images: [
      {
        url: "https://dailycodes.dev/open-graph.png",
        width: 1200,
        height: 630,
        alt: "Daily Codes logo - Web Development and Creativity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-full pb-20 lg:pb-28">
      <Nav />
      {children}
      <Footer />
    </div>
  )
}
