"use client"
import Link from "next/link"
import { useInView } from "react-intersection-observer"

export default function Nav() {
  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0,
  })

  const navItems = [
    {
      name: "Podcasts",
      link: "/rss",
    },
    {
      name: "Works",
      link: "/works",
    },
    {
      name: "About",
      link: "/",
    },
  ] as const

  return (
    <nav ref={ref}>
      <div className="min-h-[65px]" />
      <div
        className={`fixed top-0 z-40 min-w-full bg-zinc-950/60 px-2.5 py-2.5 lg:px-0`}
      >
        <div className="px-[2svw] flex items-center justify-between text-[1.2em] text-white lg:text-[1.4em]">
          <Link href="/">
            <img
              className="aspect-square w-[30px] lg:w-[45px]"
              src="/sitelogo.svg"
              alt="Logo do site"
            />
          </Link>
          <div className="flex gap-4 lg:gap-8">
            {navItems.map((item, idx) => (
              <Link
                href={item.link}
                key={idx}
                className="font-roboto_slab  duration-100 hover:scale-110 active:scale-90"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
