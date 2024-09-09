import React from "react";
import Link from "next/link";
import {getPosts} from "@/lib/notion";
import PostCard from "@/components/postCard";

export default async function Page() {
  const age = new Date().getFullYear() - 2002;

  const posts = await getPosts();
  return (
    <main className="flex gap-12 lg:gap-24 flex-col max-h-screen min-h-screen">
      <div className="flex items-center justify-center">
        <div className="px-2.5 gap-2 flex flex-col pt-[5svh]" >
            <Link className="font-fira_code link ml-[-2.5svw] text-2xl lg:text-5xl font-bold" href="/about">
              Willien
            </Link>
          <div
            className="font-fira_code text-[1rem] text-[#d0d0d0] lg:text-2xl whitespace-pre-wrap"
          >
            {`{
  age: ${age},
  occupation: "Web Developer",
  site_description: "Blog to post
  whatever i want (Mostly mine)."
}`}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className=" mb-[10svh] flex flex-col gap-8 h-[35svh] lg:h-[50svh]"
        >
          <h2 className="mb-1.5 ml-[-2.5svw] text-3xl lg:text-5xl font-bold text-center"
          >
            Posts
          </h2>
          <div className="grid-cols-2 grid gap-5 ">
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
  );
}
