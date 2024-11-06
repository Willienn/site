"use client"

import { feeds, tags } from "@/lib/rss"
import Link from "next/link"
import { useRef, useState } from "react"
import { IoMdSearch } from "react-icons/io"

const FeedItem = ({ feed }) => (
  <li key={feed.slug} className="list-none rounded-lg bg-slate-500">
    <Link
      href={`/rss/${feed.slug}`}
      className="flex w-full flex-col items-center justify-between gap-2 rounded-lg bg-slate-800/80 px-4 py-2 shadow-lg shadow-stone-950 md:h-40 md:flex-row-reverse md:gap-6"
    >
      <span className="flex w-full items-center gap-3 md:w-fit">
        <img
          src={`/rss-images/${feed.image}`}
          alt="Podcast Logo"
          className="size-20 rounded-lg shadow-lg shadow-stone-950/50 md:min-h-32 md:min-w-32"
        />
        <h2 className="w-full text-xl text-white md:hidden md:text-2xl">
          {feed.title}
        </h2>
      </span>
      <span className="flex min-h-full w-full flex-col">
        <h2 className="hidden text-lg text-white md:inline md:text-2xl">
          {feed.title}
        </h2>
        <p className="text-[1em] text-zinc-300/90 md:w-2/3">
          {feed?.description ??
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel sapiente magni"}
        </p>
      </span>
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

  const inputRef = useRef<HTMLInputElement>(null)

  // Filter feeds based on the current filter and search
  function getFilteredFeeds(tag?: (typeof tags.podcast_tags)[number]) {
    return feeds.filter((feed) => {
      const matchesSearch = search
        ? feed.title.toLowerCase().includes(search.toLowerCase())
        : true
      const matchesTag = tag ? feed.tags.includes(tag) : true
      return matchesSearch && matchesTag
    })
  }

  return (
    <main className="h-full max-w-[100svw] py-10">
      <div className="container mx-auto h-full w-full max-w-[80%] sm:max-w-[60%] xl:max-w-[40%]">
        <div className="flex w-full flex-col gap-4">
          {/* Search and Filter Section */}
          <div className="flex flex-col gap-2">
            {/* ITS REVERSED (FLEX-ROW-REVERSE) */}
            <div
              className={
                "flex h-full flex-row-reverse items-center rounded-lg bg-stone-100 px-2 py-1 shadow-inner shadow-zinc-400 " +
                "hover:cursor-pointer has-[:focus]:max-h-14 has-[:focus]:cursor-text md:has-[:focus]:max-h-16"
              }
              tabIndex={-1}
              onFocus={() => inputRef.current?.focus()}
            >
              <button
                className={`rounded-lg bg-orange-700/80 px-2 py-0.5 font-roboto_slab text-sm font-medium text-slate-100 shadow-md shadow-zinc-500 md:py-1 md:text-lg md:font-bold ${
                  filter &&
                  "!bg-orange-100 !text-orange-900 !shadow-inner !shadow-zinc-600/80"
                }`}
                onClick={() => setFilter((prev) => !prev)}
              >
                <span className={`${filter && "drop-shadow"}`}>Filter</span>
              </button>
              <input
                type="text"
                ref={inputRef}
                placeholder="Search and Filter"
                className={
                  "peer h-full w-full rounded-lg bg-stone-100 px-2 text-[.95em] text-zinc-400 outline-none duration-150 hover:cursor-pointer " +
                  "focus:max-h-10 focus:cursor-text focus:text-xl focus:text-zinc-600 focus:outline-none md:text-2xl md:placeholder:text-2xl md:focus:text-3xl"
                }
                onKeyDownCapture={({ key }) =>
                  inputRef?.current && key === "Escape"
                    ? inputRef?.current.blur()
                    : null
                }
                onChange={({ target: { value } }) =>
                  value === "" ? setSearch(false) : setSearch(value)
                }
              />
              <IoMdSearch className="rounded-lg text-xl text-gray-400 duration-150 peer-focus:text-2xl md:text-4xl md:peer-focus:text-5xl" />
            </div>
            {/* ^^ ITS REVERSED (FLEX-ROW-REVERSE) ^^ */}

            {/* Category and Subfilter Section */}
            {filter && (
              <div className="flex h-fit flex-wrap items-center gap-4 text-sm">
                {tags.podcast_tags.map((tag) => (
                  <button
                    key={tag}
                    className={`transition-none" rounded bg-orange-100 px-2 py-1 font-bold tracking-wider text-orange-900 opacity-40 ${
                      subfilter.includes(tag) &&
                      "!bg-gray-700 !text-orange-400 !opacity-100"
                    } `}
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
            {tags[filter ? "podcast_tags" : "my_tags"]
              .filter((tag) => (filter ? subfilter.includes(tag) : true))
              .map((item, idx) => {
                const tag = filter ? item : item.tag
                const text = filter ? item : item.text
                const filteredFeeds = getFilteredFeeds(tag)

                return (
                  filteredFeeds.length > 0 && (
                    <div key={idx} className="flex flex-col gap-4">
                      <h1 className="font-roboto_slab text-2xl font-bold text-zinc-100 md:text-3xl lg:text-4xl">
                        {text}
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
