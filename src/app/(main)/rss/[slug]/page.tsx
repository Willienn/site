"use client"
import { feeds } from "@/lib/rss"
import { Item, rssResponse } from "@/lib/rss/types"
import * as Slider from "@radix-ui/react-slider"
import Image from "next/image"
import { Usable, use, useState } from "react"
import { FaVolumeHigh, FaVolumeLow, FaVolumeOff } from "react-icons/fa6"
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
  params: Usable<{
    [key: string]: any
  }>
}) {
  const { slug } = use<{ [key: string]: any }>(params)
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
      <div className="container mx-auto h-full w-full max-w-[90%] sm:max-w-[60%] xl:max-w-[40%]">
        <div className="flex w-full flex-col gap-4">
          <h1 className="mb-6 items-center text-4xl font-bold sm:mb-12 sm:text-5xl">
            {feedItem.title}
          </h1>
          {/* Pagination Controls */}
          <div className="flex h-fit justify-between text-black">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`transition-none" opacity-100" h-fit rounded bg-gray-700 px-2 py-1.5 text-sm font-bold tracking-wider text-orange-400 disabled:bg-orange-100 disabled:text-orange-900 disabled:opacity-40 sm:text-lg`}
            >
              Previous
            </button>
            <span className="px-4 py-1 text-stone-600 sm:py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`transition-none" opacity-100" h-fit rounded bg-gray-700 px-2 py-1.5 text-sm font-bold tracking-wider text-orange-400 disabled:bg-orange-100 disabled:text-orange-900 disabled:opacity-40 sm:text-lg`}
            >
              Next
            </button>
          </div>

          {/* Render items */}
          <div className="flex flex-col gap-14">
            {(items as Array<Item>).map((item) => (
              <div
                key={item.link}
                className="flex max-h-96 flex-col gap-4 rounded-lg bg-stone-950 p-3 font-fira_code sm:flex-col sm:p-4"
              >
                <div className="flex h-full max-h-28 items-center gap-4 sm:max-h-64 sm:items-start">
                  {!item.image.includes(".mp3") && (
                    <Image
                      loading="eager"
                      src={item.image}
                      alt={"Ep Image"}
                      width={256}
                      height={256}
                      quality={80}
                      className="size-28 self-center rounded-md sm:size-64"
                    />
                  )}
                  <div className="line-clamp-5 flex w-full flex-col gap-1">
                    <a
                      href={item.link}
                      target="_blank"
                      className="scrollbar-hide line-clamp-2 text-lg font-semibold sm:line-clamp-3 sm:text-3xl sm:font-bold"
                    >
                      <h1>{item.title}</h1>
                    </a>
                    <div className="rounded-r border-l-2 border-stone-500 bg-orange-500/20 px-1 text-sm text-stone-500">
                      {new Date(item.isoDate).toLocaleDateString("en-US", {
                        dateStyle: "long",
                      })}
                    </div>
                    <p className="no-scrollbar line-clamp-2 text-sm text-gray-700 sm:line-clamp-5 sm:text-lg sm:leading-6">
                      {item?.contentSnippet || item?.content}
                    </p>
                  </div>
                </div>
                <div className="flex max-h-64 flex-col justify-between gap-2 overflow-hidden sm:py-4">
                  {item.enclosure?.url && (
                    <CustomAudioPlayer src={item.enclosure.url} />
                  )}
                </div>
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

type CustomAudioPlayerProps = {
  src: string
}

export function CustomAudioPlayer({ src }: CustomAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1) // Volume starts at 100%

  // Play or pause the audio
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
        setIsPlaying(true)
      } else {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  // Update time and duration
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Seek to a specific time
  const handleSeek = (value: number[]) => {
    const seekTime = (value[0] / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  // Adjust volume
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  return (
    <div className="flex w-full items-end gap-4 text-white">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />

      <button
        className={`h-fit w-14 rounded-lg border-b-4 border-l-2 border-orange-950 bg-orange-700/80 px-2 py-0.5 font-roboto_slab text-sm font-medium text-slate-100 shadow-md shadow-stone-800 transition-all duration-75 md:py-1 md:text-lg md:font-bold ${
          isPlaying &&
          "border-b-0 border-l-0 !bg-orange-100 !text-orange-900 !shadow-inner !shadow-zinc-600/80"
        }`}
        onClick={togglePlayPause}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>

      <div className="flex w-full items-end gap-4">
        <div className="flex w-full flex-col items-center">
          <div className="text-xs sm:text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <Slider.Root
            className="relative flex h-5 w-full touch-none select-none items-center duration-0"
            onValueChange={handleSeek}
            value={[(currentTime / duration) * 100 || 0]}
            max={100}
            step={1}
          >
            <Slider.Track className="relative h-2 grow rounded-sm bg-slate-600">
              <Slider.Range className="absolute h-full rounded-sm bg-sky-500" />
            </Slider.Track>
            <Slider.Thumb
              className="group block size-5 rounded bg-orange-500 focus:outline-none"
              aria-label="Player Time Control"
            >
              <div className="absolute bottom-[calc(-100%-5px)] left-1/2 hidden -translate-x-1/2 group-hover:flex">
                {formatTime(currentTime)}
              </div>
            </Slider.Thumb>
          </Slider.Root>
        </div>
        <div className="flex items-center gap-2">
          {volume * 100 >= 50 ? (
            <FaVolumeHigh />
          ) : volume * 100 <= 49 && volume * 100 >= 1 ? (
            <FaVolumeLow />
          ) : (
            <FaVolumeOff />
          )}
          {/* Volume Control */}
          <Slider.Root
            className="relative flex h-5 w-16 touch-none select-none items-center duration-0 sm:w-24"
            onValueChange={handleVolumeChange}
            value={[volume * 100]}
            max={100}
            step={1}
          >
            <Slider.Track className="relative h-2 grow rounded-sm bg-slate-600">
              <Slider.Range className="absolute h-full rounded-sm bg-sky-500" />
            </Slider.Track>
            <Slider.Thumb
              className="block size-5 rounded bg-orange-500 focus:outline-none"
              aria-label="Volume"
            />
          </Slider.Root>
        </div>
      </div>
    </div>
  )
}
