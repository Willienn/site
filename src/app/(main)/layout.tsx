import Footer from "@/components/footer"
import Nav from "@/components/nav"
import { Metadata } from "next"
import { ReactNode } from "react"
import "./global.css"

export const metadata: Metadata = {
  title: "Daily Codes",
  description:
    "Personal site that i talk about anything i want and sometimes my poems",
  keywords: [
    "blog",
    "daily",
    "codes",
    "poems",
    "programming",
    "web development",
    "nextjs",
    "nextjs13",
    "nextjs14",
    "willien muniz",
    "willien",
    "progamador web",
    "progamador",
  ],
  verification: {
    google: "a9WvUWUgrdGoNizhM8stU7ycvk83LEMaODs_8wXyw0M",
  },
  openGraph: {
    title: "Daily Codes",
    description:
      "Personal site that i talk about anything i want and sometimes my poems",
    url: "https://dailycodes.dev",
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
  alternates: {
    canonical: "https://muniz.dailycodes.dev/",
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
