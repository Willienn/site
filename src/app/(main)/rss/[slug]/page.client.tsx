"use client"
import { feeds } from "@/lib/rss/metadata"
import { Item, rssResponse } from "@/lib/rss/types"
import * as Slider from "@radix-ui/react-slider"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { FaVolumeHigh, FaVolumeLow, FaVolumeOff } from "react-icons/fa6"
import useSWR from "swr"

export type FeedItem = {
  title: string
  slug: string
  image: string
  description: string
  url: string
}

const getConnectionInfo = () => {
  const connection =
    //@ts-expect-error mozilla say that navigator have it but type dont have it
    navigator.connection ||
    //@ts-expect-error mozilla say that navigator have it but type dont have it
    navigator.mozConnection ||
    //@ts-expect-error mozilla say that navigator have it but type dont have it
    navigator.webkitConnection
  return {
    effectiveType: connection?.effectiveType || "4g",
    saveData: connection?.saveData || false,
  }
}

const fetcher = async (url: string) => {
  const { effectiveType, saveData } = getConnectionInfo()
  const res = await fetch(url, {
    cache: "force-cache",
    ...(effectiveType === "slow-2g" && { priority: "low" }),
    ...(saveData && { headers: { "Save-Data": "on" } }),
  })
  return await res.json()
}

export default function Feed({ slug }: { slug: string }) {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 10

  const feedItem = feeds.find((feed) => feed.slug === slug) as FeedItem
  const url = `/rss/api/feed?url=${encodeURIComponent(feedItem?.url)}&slug=${slug}&page=${page}&limit=${itemsPerPage}`

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    fallbackData: {
      items: [
        null,
      ],
      pagination: {
        currentPage: page,
        itemsPerPage: itemsPerPage,
      },
    },
  })

  const items = (data as rssResponse)?.items || []
  const TPages = (data as rssResponse)?.pagination.totalPages

  useEffect(() => {
    if (TPages === undefined) return
    setTotalPages(TPages)
  }, [TPages])

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(Math.max(1, Math.min(newPage, totalPages)))
    },
    [totalPages]
  )

  useEffect(() => {
    const prefetchNextPage = async () => {
      if (page < totalPages) {
        const nextUrl = `/rss/api/feed?url=${encodeURIComponent(feedItem.url)}&slug=${slug}&page=${page + 1}&limit=${itemsPerPage}`
        await fetcher(nextUrl)
      }
    }

    prefetchNextPage()
  }, [page, slug, totalPages, feedItem.url, itemsPerPage])

  if (error)
    return (
      <div className="py-10 text-center">
        <p className="mb-4 text-red-400">Error loading feed data.</p>
        <button
          onClick={() => mutate()}
          className="rounded bg-orange-500/20 px-4 py-2 hover:bg-orange-500/30"
        >
          Retry
        </button>
      </div>
    )

  function Skeleton() {
    return (
      <div className="flex flex-col gap-14">
        {Array.from({ length: itemsPerPage }).map((_, id) => (
          <div
            key={id}
            className="flex max-h-96 flex-col gap-6 rounded-lg bg-stone-950 p-3 sm:p-5"
          >
            <div
              id="informations-skeleton"
              className="flex h-full max-h-28 animate-pulse items-center gap-6 sm:max-h-64 sm:items-start"
            >
              <div
                id="image-skeleton"
                className="aspect-square size-28 max-h-28 w-full max-w-28 self-center rounded-md bg-zinc-800 sm:size-64 sm:max-h-64 sm:max-w-64"
              />

              <div
                id="text-skeleton"
                className="flex max-h-28 w-full flex-col gap-2 sm:max-h-64"
              >
                <div
                  id="title-skeleton"
                  className="h-8 w-[80%] rounded bg-zinc-600"
                />
                <div
                  id="date-skeleton"
                  className="h-5 w-32 rounded bg-orange-500/20 pl-1.5 pr-3"
                />
                <div
                  id="description-skeleton"
                  className="h-28 w-full rounded bg-zinc-600 sm:h-52"
                />
              </div>
            </div>
            <div
              id="player-skeleton"
              className="flex w-full animate-pulse items-center gap-2 px-4 sm:gap-12"
            >
              <div
                id="play-button-skeleton"
                className="h-8 w-16 rounded-lg bg-orange-700/80 px-2 py-0.5 sm:py-5"
              />
              <div id="time-control-skeleton" className="flex w-full gap-4">
                <div
                  id="time-slider-skeleton"
                  className="h-4 w-full rounded bg-orange-900"
                />
                <div
                  id="current-duration-skeleton"
                  className="h-4 w-14 rounded bg-zinc-600 sm:h-4"
                />
              </div>
              <div id="volume-skeleton" className="rounded bg-zinc-500 p-3" />
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <main className="h-full max-w-[100svw] py-10">
      <div className="container mx-auto h-full w-full max-w-[90%] lg:max-w-[80%] xl:max-w-[60%]">
        <div className="flex w-full flex-col gap-4">
          <h1 className="mb-6 items-center text-4xl font-bold sm:mb-12 sm:text-5xl">
            {feedItem.title}
          </h1>
          <div className="flex h-fit justify-between text-black">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="h-fit rounded bg-gray-700 px-2 py-1.5 text-sm font-bold tracking-wider text-orange-400 disabled:bg-orange-100 disabled:text-orange-900 disabled:opacity-40 sm:text-lg"
            >
              Previous
            </button>
            <span className="px-4 py-1 text-stone-600 sm:py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || isLoading}
              className="h-fit rounded bg-gray-700 px-2 py-1.5 text-sm font-bold tracking-wider text-orange-400 disabled:bg-orange-100 disabled:text-orange-900 disabled:opacity-40 sm:text-lg"
            >
              Next
            </button>
          </div>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="flex flex-col gap-14">
              {items.map((item: Item) => (
                <div
                  key={item.title}
                  className="flex max-h-96 flex-col gap-4 rounded-lg bg-stone-950 p-3 font-fira_code sm:flex-col sm:p-6"
                >
                  <div className="flex h-full max-h-28 items-center gap-6 sm:max-h-64 sm:items-start">
                    {item.image && !item.image.includes(".mp3") && (
                      <Image
                        src={item.image}
                        alt={`Cover for ${item.title}`}
                        width={256}
                        height={256}
                        quality={80}
                        placeholder="blur"
                        blurDataURL={item.image}
                        className="size-28 self-center rounded-md sm:size-64"
                        onError={(e) => {
                          e.currentTarget.src = `/rss-images/${slug}.jpg`
                        }}
                      />
                    )}
                    <div className="line-clamp-5 flex w-full flex-col gap-1">
                      <a
                        href={item.link}
                        target="_blank"
                        className="line-clamp-2 text-lg font-semibold sm:line-clamp-3 sm:text-3xl sm:font-bold"
                      >
                        <h1>{item.title}</h1>
                      </a>
                      <div className="w-fit rounded-r border-l-2 border-stone-500 bg-orange-500/20 pl-1.5 pr-3 text-sm text-stone-500">
                        {new Date(item.isoDate).toLocaleDateString("en-US", {
                          dateStyle: "medium",
                        })}
                      </div>
                      <p className="line-clamp-2 text-sm text-gray-700 sm:line-clamp-5 sm:text-lg sm:leading-6">
                        {item.contentSnippet || item.content}
                      </p>
                    </div>
                  </div>
                  {item.enclosure?.url && (
                    <CustomAudioPlayer src={item.enclosure.url} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

type CustomAudioPlayerProps = {
  src: string
}

export function CustomAudioPlayer({ src }: CustomAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [volumeOpen, setVolumeOpen] = useState(false)

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

  const handleSeek = (value: number[]) => {
    const seekTime = (value[0] / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

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
    <div className="flex w-full items-end gap-2 text-white sm:items-center sm:gap-12 sm:px-4">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />

      <div className="w-20 sm:w-24">
        <button
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          className={`h-fit w-16 min-w-fit rounded-lg bg-orange-700/80 px-2 py-0.5 font-roboto_slab text-sm font-medium text-slate-100 shadow-[3px_3px_3px_0px_#a9390c99] transition-all ease-in-out sm:w-20 md:py-1 md:text-lg md:font-bold ${
            isPlaying
              ? "translate-x-[1.5px] translate-y-[1.2px] !bg-orange-100 tracking-[0.5px] !text-orange-900 !shadow-inner !shadow-zinc-600/80"
              : "hover:translate-x-[1.5px] hover:translate-y-[1.2px] hover:shadow-none"
          }`}
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <div className="flex w-full flex-col-reverse items-center sm:flex-row sm:gap-4">
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center"
          value={[Math.floor((currentTime / duration) * 100)]}
          onValueChange={handleSeek}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-orange-900">
            <Slider.Range className="absolute h-full rounded-full bg-orange-400" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-3 rounded bg-orange-500 shadow-md shadow-stone-900 focus:outline-none"
            aria-label="Player time Control"
          />
        </Slider.Root>
        <div className="min-w-fit text-xs sm:text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      <div className="group relative flex w-fit items-end justify-center gap-2 p-1">
        <button
          onClick={() => setVolumeOpen((prev) => !prev)}
          className="w-fit"
        >
          {volume > 0.6 ? (
            <FaVolumeHigh />
          ) : volume > 0.2 ? (
            <FaVolumeLow />
          ) : (
            <FaVolumeOff />
          )}
        </button>
        <div
          className={`absolute bottom-[102%] box-content hidden cursor-pointer rounded bg-blue-950 py-1 hover:flex group-hover:flex ${volumeOpen && "!flex"}`}
        >
          <Slider.Root
            orientation="vertical"
            className="relative flex h-28 w-5 touch-none select-none flex-col items-center"
            value={[Math.floor(volume * 100)]}
            onValueChange={handleVolumeChange}
          >
            <Slider.Track className="relative min-h-10 w-1 grow rounded-full bg-orange-900">
              <Slider.Range className="absolute w-full rounded-full bg-orange-400" />
            </Slider.Track>
            <Slider.Thumb
              className="block size-3 cursor-pointer rounded bg-orange-500 shadow-md shadow-stone-900 focus:outline-none"
              aria-label="Volume"
            />
          </Slider.Root>
        </div>
      </div>
    </div>
  )
}
