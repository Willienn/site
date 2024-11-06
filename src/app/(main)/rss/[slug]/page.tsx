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
  fetch(url, {
    cache: "force-cache",
  }).then((res) => res.json())

export default function Feed({
  params,
}: {
  params: {
    [key: string]: any
  }
}) {
  const { slug } = use(params)
  const [
    page,
    setPage,
  ] = useState(1)

  const feedItem = feeds.find((feed) => feed.slug === slug) as FeedItem

  const itemsPerPage = 10
  if (!feedItem) return <p>Feed not found</p>

  const url = `/rss/api/feed?url=${encodeURIComponent(feedItem.url)}&slug=${slug}&page=${page}&limit=${itemsPerPage}`

  const { data, error, isLoading } = useSWR(url, fetcher)

  if (error) return <p>Error loading feed data.</p>
  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-20">
        {[
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
        ].map((item) => (
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
    <main className="h-full max-w-[100svw] py-10">
      <div className="container mx-auto h-full w-full max-w-[80%] sm:max-w-[60%] xl:max-w-[40%]">
        <div className="flex w-full flex-col gap-4">
          <h1 className="mb-12 text-5xl font-bold">{feedItem.title}</h1>
          {/* Pagination Controls */}
          <div className="mt-6 flex justify-between text-black">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`transition-none" opacity-100" rounded bg-gray-700 px-2 py-1 font-bold tracking-wider text-orange-400 disabled:bg-orange-100 disabled:text-orange-900 disabled:opacity-40`}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-stone-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`transition-none" opacity-100" rounded bg-gray-700 px-2 py-1 font-bold tracking-wider text-orange-400 disabled:bg-orange-100 disabled:text-orange-900 disabled:opacity-40`}
            >
              Next
            </button>
          </div>

          {/* Render items */}
          <div className="flex flex-col gap-20">
            {(items as Array<Item>).map((item) => (
              <div
                key={item.link}
                className="flex max-h-96 w-full gap-4 rounded-lg bg-stone-950 p-4 font-fira_code"
              >
                {!item.image.includes(".mp3") && (
                  <img
                    src={item.image}
                    alt={"Ep Image"}
                    className="aspec size-64 rounded-md"
                  />
                )}
                <div className="flex max-h-64 flex-col justify-between gap-2 overflow-hidden py-4">
                  <div className="flex flex-col gap-2">
                    <a
                      href={item.link}
                      target="_blank"
                      className="max-h-[50%] overflow-hidden text-3xl font-bold"
                    >
                      <h1>{item.title}</h1>
                    </a>
                    <div className="w-fit rounded-r border-l-2 border-stone-500 bg-orange-500/20 px-1 text-stone-500">
                      {new Date(item.isoDate).toLocaleDateString("en-US", {
                        dateStyle: "long",
                      })}
                    </div>
                  </div>
                  {item.enclosure?.url && (
                    <CustomAudioPlayer src={item.enclosure.url} />
                  )}
                </div>
                {/* <p className="no-scrollbar overflow-auto text-gray-700">
                    {item?.contentSnippet || item?.content}
                  </p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

// TODO do something with this?
import { useRef } from "react"

export function CustomAudioPlayer({ src }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1) // Volume starts at 100%

  // Play or pause the audio
  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  // Update time and duration
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  // Seek to a specific time
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  // Adjust volume
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100
    audioRef.current.volume = newVolume
    setVolume(newVolume)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  return (
    <div className="flex w-full items-end gap-4 p-4 text-white">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />

      {/* Play/Pause Button */}
      <button
        className={`rounded-lg bg-orange-700/80 px-2 py-0.5 font-roboto_slab text-sm font-medium text-slate-100 shadow-md shadow-stone-800 md:py-1 md:text-lg md:font-bold ${
          isPlaying &&
          "!bg-orange-100 !text-orange-900 !shadow-inner !shadow-zinc-600/80"
        }`}
        onClick={togglePlayPause}
      >
        <span className={`${isPlaying && "drop-shadow"}`}>
          {isPlaying ? "Stop" : "Play"}
        </span>
      </button>

      <div className="flex flex-col">
        <div className="text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <input
          type="range"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className="appearance-none"
        />
      </div>

      {/* Volume Control */}
      <input
        type="range"
        value={volume * 100}
        onChange={handleVolumeChange}
        className="w-20 appearance-none"
      />
    </div>
  )
}
