"use client"
import { feeds } from "@/lib/rss"
import { Item, rssResponse } from "@/lib/rss/types"
import * as Slider from "@radix-ui/react-slider"
import Image from "next/image"
import { useCallback, useRef, useState } from "react"
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
  fetch(url, { cache: "force-cache" }).then((res) => res.json())

export default function Feed({ slug }: { slug: string }) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const feedItem = feeds.find((feed) => feed.slug === slug) as FeedItem
  const url = `/rss/api/feed?url=${encodeURIComponent(feedItem?.url)}&slug=${slug}&page=${page}&limit=${itemsPerPage}`

  const { data, error, isLoading } = useSWR(url, fetcher, {
    fallbackData: {
      items: [
        null,
      ],
      pagination: {
        currentPage: page,
        itemsPerPage: itemsPerPage,
      },
      imagePath: "null",
    },
  })

  const items = (data as rssResponse)?.items || []
  const totalPages = (data as rssResponse)?.pagination.totalPages

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(Math.max(1, Math.min(newPage, totalPages)))
    },
    [totalPages]
  )

  if (error) return <p>Error loading feed data.</p>
  function Skeleton() {
    return (
      <div className="flex flex-col gap-14">
        {Array.from({ length: 10 }, (_, index) => index).map((id: number) => (
          <div
            key={id}
            id="episodes-skeleton"
            className="flex max-h-96 flex-col gap-4 rounded-lg bg-stone-950 p-3 font-fira_code sm:flex-col sm:p-4"
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
              className="flex w-full animate-pulse items-center gap-12 px-4"
            >
              <div
                id="play-button-skeleton"
                className="md:py-1/5 h-8 w-16 rounded-lg bg-orange-700/80 px-2 py-0.5"
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
              disabled={page === totalPages}
              className="h-fit rounded bg-gray-700 px-2 py-1.5 text-sm font-bold tracking-wider text-orange-400 disabled:bg-orange-100 disabled:text-orange-900 disabled:opacity-40 sm:text-lg"
            >
              Next
            </button>
          </div>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="flex flex-col gap-14">
              {items.map((item: Item, idx: number) => (
                <div
                  key={item.title}
                  className="flex max-h-96 flex-col gap-4 rounded-lg bg-stone-950 p-3 font-fira_code sm:flex-col sm:p-6"
                >
                  <div className="flex h-full max-h-28 items-center gap-6 sm:max-h-64 sm:items-start">
                    {item.image && !item.image.includes(".mp3") && (
                      <Image
                        src={item.image}
                        alt="Ep Image"
                        width={256}
                        height={256}
                        quality={80}
                        className="size-28 self-center rounded-md sm:size-64"
                        onError={(e) =>
                          (e.currentTarget.src = `/rss-images/${slug}-logo.jpg`)
                        }
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
    <div className="flex w-full items-center gap-12 px-4 text-white">
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
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div className="flex w-full gap-4">
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
      <div className="group relative flex w-fit items-center justify-center gap-2 p-4">
        <button onClick={() => handleVolumeChange([0])} className="w-fit">
          {volume > 0.6 ? (
            <FaVolumeHigh />
          ) : volume > 0.2 ? (
            <FaVolumeLow />
          ) : (
            <FaVolumeOff />
          )}
        </button>
        <div className="absolute -right-[calc(6rem)] box-content hidden h-6 w-20 rounded bg-stone-950 px-2 hover:flex group-hover:flex">
          <Slider.Root
            className="relative flex h-5 w-full touch-none select-none items-center"
            value={[Math.floor(volume * 100)]}
            onValueChange={handleVolumeChange}
          >
            <Slider.Track className="relative h-1 w-full grow rounded-full bg-orange-900">
              <Slider.Range className="absolute h-full rounded-full bg-orange-400" />
            </Slider.Track>
            <Slider.Thumb
              className="block size-3 rounded bg-orange-500 shadow-md shadow-stone-900 focus:outline-none"
              aria-label="Volume"
            />
          </Slider.Root>
        </div>
      </div>
    </div>
  )
}
