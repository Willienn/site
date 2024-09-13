import PostCard from "@/components/postCard"
import { getPosts } from "@/lib/notion"
import Link from "next/link"

export default async function Page() {
  const age = new Date().getFullYear() - 2002

  const posts = await getPosts()
  return (
    <main className="flex max-h-screen min-h-screen flex-col gap-12 lg:gap-24">
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-2 px-2.5 pt-[5svh]">
          <Link
            className="link ml-[-2.5svw] font-roboto_slab text-2xl font-bold lg:text-5xl"
            href="/about"
          >
            Willien
          </Link>
          <div className="whitespace-pre-wrap font-fira_code text-[1rem] text-[#d0d0d0] lg:text-2xl">
            {`{
  age: ${age},
  occupation: "Web Developer",
  site_description: "Blog to post
  whatever i want."
}`}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="mb-[10svh] flex h-[35svh] flex-col gap-8 lg:h-[50svh]">
          <h2 className="mb-1.5 ml-[-2.5svw] text-center font-roboto_slab text-3xl font-bold lg:text-5xl">
            Posts
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                postLink={`/posts/${post.tags.Slug.url}`}
                postImg={post.cover?.external?.url || post.cover?.file?.url}
                postTitle={post.title}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
