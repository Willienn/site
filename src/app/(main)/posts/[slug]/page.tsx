import { posts } from "@/lib/posts/metadata"
import matter from "gray-matter"
import Post from "./page.client"

export async function fetchPost(slug: string) {
  const post = await fetch(
    `https://raw.githubusercontent.com/Willienn/site-posts/main/posts/${slug}.md`,
    { next: { revalidate: 3600 } }
  )
    .then((value) => value.text())
    .catch((cause) => console.log(`Failed to fetch post: ${cause}`))
  return post || "no-content-found"
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  const post = await fetchPost(slug)

  const { data } = matter(post)
  const { banner, title } = data

  return {
    title,
    openGraph: {
      title,
      images: [
        {
          url: banner,
          alt: `Banner image for ${title}`,
        },
      ],
    },
  }
}

type PageProps = { params: { slug: string } }

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const postMetadata = posts.find((item) => item.slug === slug)
  const post = await fetchPost(slug)
  const { data } = matter(post)
  const { title, date } = data

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: date,
    dateModified: date,
    author: [
      {
        "@type": "Person",
        name: "Willien Muniz",
        url: "https://dailycodes.dev/about",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Post altImg={postMetadata?.image} post={post} />
    </>
  )
}
