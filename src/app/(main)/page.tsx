import PostCard from "@/components/postCard"
import { posts } from "@/lib/posts/metadata"
import Link from "next/link"

export default async function Page() {
  const age = new Date().getFullYear() - 2002

  return (
    <main className="flex h-full max-h-screen min-h-screen w-full flex-col gap-12 lg:gap-24">
      <div className="flex items-center justify-center">
        <div className="flex flex-col sm:gap-2 px-2.5 pt-[5svh]">
          <Link
            className="link ml-[-2.5svw] font-poppins text-2xl font-bold lg:text-5xl"
            href="/about"
          >
            Willien<strong className="text-sky-800 font-roboto_slab">.</strong>
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
        <div className="mb-[10svh] flex h-[35svh] flex-col gap-4 sm:gap-8 lg:h-[50svh]">
          <h2 className="mb-1.5 text-center font-poppins text-3xl font-bold lg:text-5xl">
            Recent posts
            <strong className="font-roboto_slab text-orange-500">.</strong>
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {posts?.map(({ title, slug, image }) => (
              <PostCard
                key={title + slug}
                postLink={`/posts/${slug}`}
                postImg={image}
                postTitle={title}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
