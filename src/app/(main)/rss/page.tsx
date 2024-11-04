"use client"

import { feeds, tags } from "@/lib/rss"
import Link from "next/link"
import { useRef, useState } from "react"

const FeedItem = ({ feed }) => (
  <li key={feed.slug} className="list-none">
    <Link
      href={`/rss/${feed.slug}`}
      className="flex justify-between rounded-lg bg-zinc-950 p-2"
    >
      <p className="flex flex-col">
        <span>{feed.title}</span>
        <span className="text-slate-400">{feed.description}</span>
      </p>
      <img
        src={`/rss-images/${feed.image}`}
        className="aspect-square w-20 rounded-lg"
      />
    </Link>
  </li>
)

export default function Home() {
  const [filter, setFilter] = useState(false)
  const [search, setSearch] = useState<string | false>(false)
  const [subfilter, setSubFilter] = useState<
    Array<(typeof tags.podcast_tags)[number]>
  >(["Programming"])

  const divRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter feeds based on the current filter and search
  function getFilteredFeeds(tag: (typeof tags.podcast_tags)[number]) {
    return feeds.filter((feed) =>
      search
        ? feed.title.toLowerCase().includes(search.toLowerCase()) &&
          feed.tags.includes(tag)
        : feed.tags.includes(tag)
    )
  }

  return (
    <main className="h-full w-full py-10">
      <div className="container mx-auto h-full max-w-[30%]">
        <div className="flex w-full flex-col gap-10">
          {/* Feeds Section */}
          <ul className="flex flex-col gap-8">
            {!filter
              ? tags.my_tags.map(({ tag, text }, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <h1 className="font-roboto_slab text-xl font-bold md:text-3xl lg:text-4xl">
                      {text}
                    </h1>
                    {feeds
                      .filter((feed) => feed.tags.includes(tag))
                      .map((feed) => (
                        <FeedItem key={feed.slug} feed={feed} />
                      ))}
                  </div>
                ))
              : tags.podcast_tags
                  .filter((tag) => subfilter.includes(tag))
                  .map((tag, idx) => {
                    const filteredFeeds = getFilteredFeeds(tag)
                    return (
                      filteredFeeds.length > 0 && (
                        <div key={idx} className="flex flex-col gap-4">
                          <h1 className="font-roboto_slab text-xl font-bold md:text-3xl lg:text-4xl">
                            {tag}
                          </h1>
                          {filteredFeeds.map((feed) => (
                            <FeedItem key={feed.slug} feed={feed} />
                          ))}
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
/**<div className="flex flex-col gap-2">
            <h2 className="text-2xl">Search and Filter</h2>
            <div
              className="group flex h-fit items-center rounded-lg bg-white focus:bg-red-500"
              ref={divRef}
              tabIndex={-1} // Makes the div focusable but not in the tab order
              onClick={() => divRef.current?.focus()} // Focuses div on click
              onFocus={() => inputRef.current?.focus()} // Focuses input when div is focused
            >
              <IoMdSearch className="text-4xl text-gray-400 group-focus:text-8xl" />
              <input
                type="text"
                ref={inputRef}
                className="peer h-14 w-full px-12 text-3xl text-slate-400 hover:cursor-pointer focus:outline-none"
                onChange={({ target }) =>
                  target.value === ""
                    ? setSearch(false)
                    : setSearch(target.value)
                }
              />
              <button
                className={`rounded-md bg-slate-800 px-2 py-1 text-white ${
                  !filter && "!bg-slate-100 !text-black"
                }`}
                onClick={() => setFilter(false)}
              >
                Classification
              </button>
              <button
                className={`bg-slate-800 px-2 py-1 text-white ${
                  filter && "!bg-slate-100 !text-black"
                }`}
                onClick={() => setFilter(true)}
              >
                Category
              </button>
            </div>
            <div className="flex items-center gap-5">
              <span>Filter By </span>
            </div>

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
          </div> */
