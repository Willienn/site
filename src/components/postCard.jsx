"use client"
import { Image } from "@CS-chakra"
import Link from "next/link"

export default function PostCard({ postLink, postImg, postTitle }) {
  return (
    <Link href={postLink}>
      <div className="group relative h-24 w-36 rounded-lg bg-[#2f2f2f] hover:scale-105 hover:shadow-[0_0_40px_#4c4c4c88] md:h-52 md:w-96">
        <Image
          opacity="80%"
          alt={"logo do post: " + postTitle}
          w="100%"
          h="100%"
          className="rounded-lg"
          objectFit="cover"
          src={postImg}
        />
        <div className="absolute bottom-0 flex h-7 w-full items-center overflow-hidden text-ellipsis text-nowrap bg-[#0d0d0db0] px-1.5 font-roboto_slab text-xs group-hover:bg-[#0d0d0db0] md:px-3 md:text-[1em] lg:h-9">
          {postTitle}
        </div>
      </div>
    </Link>
  )
}
