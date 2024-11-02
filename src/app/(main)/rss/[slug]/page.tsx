"use client"
import { FEEDS } from "@/lib/rss"
import { Item, rssResponse } from "@/lib/rss/types"
import { useState } from "react"
import useSWR from "swr"

type FeedItem = {
  title: string
  slug: string
  image: string
  description: string
  url: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Feed({ params }: { params: { [key: string]: any } }) {
  const { slug } = params
  const feedItem = FEEDS.find((feed) => feed.slug === slug) as FeedItem
  const itemsPerPage = 10 // Set a limit for items per page
  const [page, setPage] = useState(1) // Current page state

  if (!feedItem) return <p>Feed not found</p>

  // Construct the fetch URL
  const url = `http://localhost:3000/rss/api/feed?url=${encodeURIComponent(feedItem.url)}&slug=${slug}&page=${page}&limit=${itemsPerPage}`

  // Use SWR to fetch the data
  const { data, error, isValidating } = useSWR(url, fetcher)

  // Conditional rendering for loading state
  if (error) return <p>Error loading feed data.</p>

  const items = (data as rssResponse)?.items || [] // Fallback to an empty array if data is not yet available
  const totalPages = (data as rssResponse)?.pagination.totalPages || 0 // Fallback to 0 if data is not available

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
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
          <div key={item.link} className="flex flex-col font-fira_code">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
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
              {item.contentSnippet || item.content}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls (Again) */}
      <div className="mt-6 flex justify-between">
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
    </div>
  )
}
