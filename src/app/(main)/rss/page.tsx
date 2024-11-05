"use client"

import { feeds, tags } from "@/lib/rss"
import Link from "next/link"
import { useRef, useState } from "react"
import { IoMdSearch } from "react-icons/io"

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
  const [
    filter,
    setFilter,
  ] = useState(false)
  const [
    search,
    setSearch,
  ] = useState<string | false>(false)
  const [
    subfilter,
    setSubFilter,
  ] = useState<Array<(typeof tags.podcast_tags)[number]>>([
    "Programming",
  ])

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
    <main className="h-full max-w-[100svw] py-10">
      <div className="container mx-auto h-full w-full max-w-[80%] lg:max-w-[30%]">
        <div className="flex w-full flex-col gap-10">
          {/* Search and Filter Section */}
          <div className="flex flex-col gap-2">
            {/* ITS REVERSED (FLEX-ROW-REVERSE) */}
            <div
              className="!has-[:focus]:cursor-text flex h-full flex-row-reverse items-center rounded-lg bg-stone-100 px-2 py-1 shadow-inner shadow-zinc-400 hover:cursor-pointer has-[:focus]:max-h-16"
              ref={divRef}
              tabIndex={-1}
              onFocus={() => inputRef.current?.focus()}
            >
              <div className="flex gap-2 px-1 font-roboto_slab text-sm font-bold lg:gap-5 lg:text-lg">
                <button
                  className={`rounded-lg bg-orange-700/80 px-2 py-1 text-slate-100 shadow-md shadow-zinc-500 ${
                    !filter &&
                    "!bg-orange-100 !text-orange-900 !shadow-inner !shadow-zinc-600/80 hover:cursor-default"
                  }`}
                  onClick={() => setFilter(false)}
                >
                  <span className={`${!filter && "drop-shadow"}`}>
                    Classification
                  </span>
                </button>
                <button
                  className={`rounded-lg bg-orange-700/80 px-2 py-1 text-slate-100 shadow-md shadow-zinc-500 ${
                    filter &&
                    "!bg-orange-100 !text-orange-900 !shadow-inner !shadow-zinc-600/80 hover:cursor-default"
                  }`}
                  onClick={() => setFilter(true)}
                >
                  <span className={`${filter && "drop-shadow"}`}>Category</span>
                </button>
              </div>
              <input
                type="text"
                ref={inputRef}
                placeholder="Search and Filter"
                className="peer h-full max-h-6 w-full bg-stone-100 px-2 text-2xl text-zinc-400 outline-none transition-none placeholder:text-2xl hover:cursor-pointer focus:max-h-8 focus:cursor-text focus:text-3xl focus:text-zinc-600 focus:outline-none focus:transition-all"
                onChange={({ target }) =>
                  target.value === ""
                    ? setSearch(false)
                    : setSearch(target.value)
                }
              />
              <IoMdSearch className="rounded-lg text-gray-400 lg:text-4xl lg:peer-focus:text-5xl" />
            </div>
            {/* ^^ ITS REVERSED (FLEX-ROW-REVERSE) ^^ */}

            {/* Category and Subfilter Section */}
            {filter && (
              <div className="flex h-fit flex-wrap items-center gap-4 text-sm">
                {tags.podcast_tags.map((tag) => (
                  <button
                    key={tag}
                    className={`rounded bg-orange-100 px-2 py-1 font-bold tracking-wider text-orange-900 opacity-40 transition-none ${subfilter.includes(tag) && "!bg-gray-700 !text-orange-400 !opacity-100"} `}
                    onClick={() => {
                      setSubFilter((old) => {
                        if (old.length === 1 && old.includes(tag)) return old // Prevents unselecting the last item
                        if (old.includes(tag))
                          return old.filter((item) => item !== tag)
                        return [
                          ...old,
                          tag,
                        ]
                      })
                    }}
                  >
                    <span className={`${!filter && "drop-shadow"}`}>{tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Feeds Section */}
          <ul className="flex flex-col gap-8">
            {!filter
              ? tags.my_tags.map(({ tag, text }, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <h1 className="font-roboto_slab text-xl font-bold text-zinc-100 md:text-3xl lg:text-4xl">
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
                          <h1 className="font-roboto_slab text-xl font-bold text-zinc-100 md:text-3xl lg:text-4xl">
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
