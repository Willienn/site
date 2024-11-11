import Link from "next/link"
import Image from "next/image"

export default function PostCard({ postLink, postImg, postTitle }) {
  return (
    <Link href={postLink}>
      <div className="group relative h-24 w-36 rounded-lg bg-[#2f2f2f] hover:scale-105 transition-all hover:shadow-[0_0_40px_#4c4c4c88] md:h-52 md:w-96">
        <Image
        width={350}
        height={350}
        quality={80}
          alt={"logo do post: " + postTitle}
          className="h-full w-full rounded-lg object-cover opacity-80"
          src={postImg}
        />
        <div className="absolute bottom-0 flex h-7 w-full items-center overflow-hidden text-ellipsis text-nowrap bg-[#0d0d0db0] px-1.5 font-roboto_slab text-xs group-hover:bg-[#0d0d0db0] md:px-3 md:text-[1em] lg:h-9">
          {postTitle}
        </div>
      </div>
    </Link>
  )
}
