"use client"
import { FEEDS } from "@/lib/rss";
import { useEffect, useState } from "react";
type FeedItem = {
  title: "string",
  slug: "string",
  image: "string",
  description: "string",
  url: "string",
}
export default function Feed({ params }) {
  const { slug } = params;
  const feedItem: FeedItem = FEEDS.find((feed) => feed.slug === slug);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchFeed() {
      const response = await fetch(`/rss/api/feed?url=${encodeURIComponent(feedItem.url)}`);
      const data = await response.json();
      setItems(data.items);
    }
    fetchFeed();
  }, [feedItem.url]);

  if (!feedItem) return <p>Feed not found</p>;

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="mb-12 text-5xl font-bold">{feedItem.title}</h1>
      <div className="flex flex-col gap-20">
        {items.map((item) => (
          <div key={item.link} className="flex flex-col font-fira_code">
            {item.image && (
              <img src={item.image} alt={item.title} className="mb-4 w-full rounded-lg" />
            )}

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold  hover:underline"
            >
              {item.title}
            </a>
            <div>{new Date(item.isoDate).toLocaleDateString("en-US", { "dateStyle": "long" })}</div>

            {item.enclosure?.url && (
              <audio controls className="mt-2 w-full">
                <source src={item.enclosure.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}

            <p className="mt-2 text-gray-700">{item.contentSnippet || item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
