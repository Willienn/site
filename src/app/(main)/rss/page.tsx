"use client"

import { feeds, tags } from "@/lib/rss"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [filter, setFilter] = useState(false)
  const [algo, setAlgo] = useState([])
  const [search, setSearch] = useState<string | false>(false)
  const [subfilter, setSubFilter] = useState<
    Array<(typeof tags.podcast_tags)[number]>
  >(["Programming"])

  return (
    <main className="h-full w-full py-10">
      <div className="container mx-auto h-full max-w-[30%]">
        <div className="flex w-full flex-col gap-10">
          {/* Search and Filter Section */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">Search and Filter</h2>
            <input
              onChange={({ target }) =>
                target.value === "" ? setSearch(false) : setSearch(target.value)
              }
              className="rounded text-slate-800"
              placeholder="Search..."
            />

            {/* Toggle between Classification and Category filters */}
            <div className="flex items-center gap-5">
              <span>Filter By </span>
              <button
                className={`rounded-md bg-slate-800 px-2 py-1 text-white ${!filter && "!bg-slate-100 !text-black"}`}
                onClick={() => setFilter(false)}
              >
                Classification
              </button>
              <button
                className={`rounded-md bg-slate-800 px-2 py-1 text-white ${filter && "!bg-slate-100 !text-black"}`}
                onClick={() => setFilter(true)}
              >
                Category
              </button>
            </div>

            {/* Category and Subfilter Section */}
            {filter && (
              <div className="flex items-center gap-5 text-sm">
                <span>Categories</span>
                {tags.podcast_tags.map((tag) => (
                  <button
                    key={tag}
                    className={`rounded-md bg-slate-800 px-2 py-1 text-sm text-white ${subfilter.includes(tag) && "!bg-slate-100 !text-black"}`}
                    onClick={() => {
                      setSubFilter((old) => {
                        if (old.length === 1 && old.includes(tag)) return old // Prevents unselecting the last item
                        if (old.includes(tag))
                          return old.filter((item) => item !== tag)
                        return [...old, tag]
                      })
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Feeds Section */}
          <ul className="flex flex-col gap-8">
            {/* Display based on selected filter */}
            {!filter &&
              tags.my_tags.map(({ tag, text, subText }, idx) => (
                <div key={idx}>
                  <h1 className="font-roboto_slab text-xl font-bold md:text-3xl lg:text-4xl">
                    {text} <span className="text-slate-500">{subText}</span>
                  </h1>
                  {feeds
                    .filter((item) => item.tags.includes(tag))
                    .map((feed) => (
                      <li key={feed.slug} className="list-none">
                        <Link
                          href={`/rss/${feed.slug}`}
                          className="flex justify-between rounded-lg"
                        >
                          <p className="flex flex-col">
                            <span>{feed.title}</span>
                            <span className="text-slate-400">
                              {feed.description}
                            </span>
                          </p>
                          <img
                            src={`/rss-images/${feed.image}`}
                            className="aspect-square w-20"
                          />
                        </Link>
                      </li>
                    ))}
                </div>
              ))}
            {/* Display filtered feeds based on Category and Subfilter */}
            {filter &&
              tags.podcast_tags
                .filter((tag) => subfilter.includes(tag))
                .map((tag, idx) => {
                  const filteredFeeds = feeds.filter((item) =>
                    search
                      ? item.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) &&
                        item.tags.includes(tag)
                      : item.tags.includes(tag)
                  )
                  return (
                    filteredFeeds.length > 0 && (
                      <div key={idx}>
                        <h1 className="font-roboto_slab text-xl font-bold md:text-3xl lg:text-4xl">
                          {tag}
                        </h1>
                        {filteredFeeds.map((feed) => {
                          return (
                            <li key={feed.slug} className="list-none">
                              <Link
                                href={`/rss/${feed.slug}`}
                                className="flex justify-between rounded-lg"
                              >
                                <p className="flex flex-col">
                                  <span>{feed.title}</span>
                                  <span className="text-slate-400">
                                    {feed.description}
                                  </span>
                                </p>
                                <img
                                  src={`/rss-images/${feed.image}`}
                                  className="aspect-square w-20"
                                />
                              </Link>
                            </li>
                          )
                        })}
                      </div>
                    )
                  )
                })}
          </ul>
        </div>
      </div>
    </main>
  )
}
