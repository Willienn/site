import { posts } from "@/lib/posts/metadata"
import matter from "gray-matter"
import Post from "./page.client"

export async function fetchPost(slug: string) {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/Willienn/site-posts/main/posts/${slug}.md`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`)
    return await res.text()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const post = await fetchPost(slug)
  const { data } = matter(post)
  const { banner, title } = data

  return {
    title,
    openGraph: { images: banner },
  }
}

type PageProps = { params: { slug: string } }

export default async function Page({ params }: PageProps) {
  const post = await fetchPost(params.slug)
  return <Post slug={params.slug} post={post} />
}
