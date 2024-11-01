import { FEEDS } from "@/lib/rss"
import Link from "next/link"

export default function Home() {
  return (
    <main className="w-full h-full py-10">
      <div className="container w-fit h-full mx-auto flex flex-col gap-10 max-w-[30%]">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold font-roboto_slab">Recomended Posdcasts (RSS)</h1>
        <ul className="flex flex-col gap-8">
          {FEEDS.map((feed) => (
            <li key={feed.slug} className="list-none"
            >
              <Link
                href={`/rss/${feed.slug}`}
                className="flex justify-between rounded-lg0"

              >
                <p className="flex flex-col">
                  <span>
                    {feed.title}
                  </span>
                  <span className="text-slate-400">
                    {feed.description}
                  </span>
                </p>
                <img src={`/rss-images/${feed.image}`} className="aspect-square w-20" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
