import { feeds } from "@/lib/rss/metadata"
import Feed from "./page.client"

export async function generateStaticParams() {
  return feeds.map((feed) => ({
    slug: feed.slug,
  }))
}
export const revalidate = 3600

export default async function Page({
  params,
}: {
  params: { [key: string]: any }
}) {
  const { slug } = await params

  return <Feed slug={slug} />
}
