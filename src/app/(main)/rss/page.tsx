import { FEEDS } from "@/lib/rss"
import Link from "next/link"

export default function Home() {
  return (
    <main className="h-full w-full py-10">
      <div className="container mx-auto h-full max-w-[30%]">
        <div className="flex w-full flex-col gap-10">
          <h1 className="font-roboto_slab text-xl font-bold md:text-3xl lg:text-4xl">
            Recomended Podcasts <span className="text-slate-500">(RSS)</span>
          </h1>
          <ul className="flex flex-col gap-8">
            {FEEDS.filter((item) => item.tags.includes("Favorite")).map(
              (feed) => (
                <li key={feed.slug} className="list-none">
                  <Link
                    href={`/rss/${feed.slug}`}
                    className="rounded-lg0 flex justify-between"
                  >
                    <p className="flex flex-col">
                      <span>{feed.title}</span>
                      <span className="text-slate-400">{feed.description}</span>
                    </p>
                    <img
                      src={`/rss-images/${feed.image}`}
                      className="aspect-square w-20"
                    />
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="flex w-full flex-col gap-10">
          <h1 className="flex flex-col font-roboto_slab text-xl font-bold md:text-3xl lg:text-4xl">
            <span className="">Reviewing Podcasts</span>
            <span className="text-slate-500">(Opinion still not formed)</span>
          </h1>
          <ul className="flex flex-col gap-8">
            {FEEDS.filter((item) => item.tags.includes("Reviewing")).map(
              (feed) => (
                <li key={feed.slug} className="list-none">
                  <Link
                    href={`/rss/${feed.slug}`}
                    className="rounded-lg0 flex justify-between"
                  >
                    <p className="flex flex-col">
                      <span>{feed.title}</span>
                      <span className="text-slate-400">{feed.description}</span>
                    </p>
                    <img
                      src={`/rss-images/${feed.image}`}
                      className="aspect-square w-20"
                    />
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}
