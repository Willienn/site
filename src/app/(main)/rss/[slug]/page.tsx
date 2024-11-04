"use client"
import { feeds } from "@/lib/rss"
import { Item, rssResponse } from "@/lib/rss/types"
import { use, useState } from "react"
import useSWR from "swr"

type FeedItem = {
  title: string
  slug: string
  image: string
  description: string
  url: string
}

const fetcher = (url: string) =>
  fetch(url, { cache: "force-cache" }).then((res) => res.json())

export default function Feed({ params }: { params: { [key: string]: any } }) {
  const { slug } = use(params)
  const [page, setPage] = useState(1)

  const feedItem = feeds.find((feed) => feed.slug === slug) as FeedItem

  const itemsPerPage = 10
  if (!feedItem) return <p>Feed not found</p>

  const url = `/rss/api/feed?url=${encodeURIComponent(feedItem.url)}&slug=${slug}&page=${page}&limit=${itemsPerPage}`

  const { data, error, isLoading } = useSWR(url, fetcher)

  if (error) return <p>Error loading feed data.</p>
  if (isLoading) {
    return (
      <div className="flex flex-col gap-20 h-full w-full items-center justify-center">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div
            key={item}
            className="mx-auto w-[36rem] max-w-[36rem] animate-pulse px-6 py-12"
          >
            <div className="mb-12 h-10 w-1/2 rounded bg-gray-200" />
            <div className="flex flex-col gap-2">
              <div className="mb-4 h-96 rounded bg-gray-200" />
              <div className="h-10 w-full rounded bg-gray-200" />
              <div className="h-6 w-1/4 rounded bg-gray-200" />
              <div className="h-12 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  console.log(data)

  const items = (data as rssResponse)?.items || []
  const totalPages = (data as rssResponse)?.pagination.totalPages || 0

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[36rem] px-6 py-12">
        <h1 className="mb-12 text-5xl font-bold">{feedItem.title}</h1>
        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between text-black">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Render items */}
        <div className="flex flex-col gap-20">
          {(items as Array<Item>).map((item) => (
            <div
              key={item.link}
              className="flex w-full flex-col font-fira_code"
            >
              {!item.image.includes(".mp3") && (
                <img
                  src={item.image}
                  alt={"Ep Image"}
                  className="mb-4 w-full rounded-lg"
                />
              )}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                {item.title}
              </a>
              <div>
                {new Date(item.isoDate).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </div>
              {item.enclosure?.url && (
                <audio controls className="mt-2 w-full">
                  <source src={item.enclosure.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              <p className="mt-2 text-gray-700">
                {item?.contentSnippet || item?.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
