import { feeds } from "@/lib/rss/metadata"
import Feed, { FeedItem } from "./page.client"

export async function generateStaticParams() {
  return feeds.map((feed) => ({
    slug: feed.slug,
  }))
}
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  const feedItem = feeds.find((feed) => feed.slug === slug) as FeedItem

  const { title, description, image } = feedItem

  return {
    title: `Daily Codes - Podcasts - ${title}`,
    description:
      description || `${title} podcast, episodes list on Daily Codes`,
    openGraph: {
      title: `Daily Codes - ${title}`,
      description: description,
      images: [
        {
          url: image,
          alt: `Cover image for ${title}`,
        },
      ],
    },
  }
}

export default async function Page({
  params,
}: {
  params: { [key: string]: any }
}) {
  const { slug } = await params

  return <Feed slug={slug} />
}
