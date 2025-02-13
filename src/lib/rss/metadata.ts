/**
 * Favorite > Recomended > Reviewing
 */
export const tags = {
  podcast_tags: [
    "Programming",
    "Cybersecurity",
    "Networking",
    "Tech",
    "RPG",
  ],
  my_tags: [
    {
      tag: "Favorite",
      text: "My Favorites Podcasts",
    },
    {
      tag: "Recommended",
      text: "Recommended Podcasts",
    },
    {
      tag: "Reviewing",
      text: "Reviewing Podcasts",
    },
  ],
} as const
// {
//   podcast_tags: Array<string>
//   my_tags: Array<{ tag: string; text: string }>
// }

export const feeds = [
  {
    title: "Smashing Security",
    slug: "smashing-security",
    image: "smashing-security-logo.jpg",
    description: "Text to describe what is and why i like it",
    url: "https://feeds.captivate.fm/smashing-security/",
    tags: [
      "Cybersecurity",
      "Favorite",
      "Recommended",
    ],
  },
  {
    title: "Darknet Diaries",
    slug: "darknet-diaries",
    image: "darknet-diaries-logo.jpg",
    description: "Text to describe what is and why i like it",
    url: "https://podcast.darknetdiaries.com",
    tags: [
      "Cybersecurity",
      "Favorite",
      "Recommended",
    ],
  },
  {
    title: "The Adventure Zone",
    slug: "the-adventure-zone",
    image: "the-adventure-zone-logo.jpg",
    description: "Text to describe what is and why i like it",
    url: "https://feeds.simplecast.com/cYQVc__c",
    tags: [
      "RPG",
      "Favorite",
      "Recommended",
    ],
  },
  {
    title: "Javascript Jabber",
    slug: "javascript-jabber",
    image: "javascript-jabber-logo.jpg",
    url: "https://www.spreaker.com/show/6102064/episodes/feed",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "Programming Throwdown",
    slug: "programming-throwdown",
    image: "programming-throwdown-logo.jpg",
    url: "https://feeds.transistor.fm/programming-throwdown",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "Shop Talk",
    slug: "shop-talk",
    image: "shop-talk-logo.jpg",
    url: "https://shoptalkshow.com/feed/podcast/default-podcast/",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "Algorithms + Data Structures = Programs",
    slug: "adsp",
    image: "adsp-logo.jpg",
    url: "https://feeds.buzzsprout.com/1501960.rss",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "SE Radio",
    slug: "se-radio",
    image: "se-radio-logo.jpg",
    url: "https://seradio.libsyn.com/rss",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "Syntax",
    slug: "syntax",
    image: "syntax-logo.jpg",
    url: "https://feed.syntax.fm/",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "JSParty",
    slug: "jsparty",
    image: "jsparty-logo.jpg",
    url: "https://changelog.com/jsparty/feed",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "Daily Tech News Show",
    slug: "daily-tech-news-show",
    image: "daily-tech-news-show-logo.jpg",
    url: "https://access.acast.com/rss/61954547cb03c875f7617118/default",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "Cortex",
    slug: "cortex",
    image: "cortex-logo.jpg",
    url: "https://www.relay.fm/cortex/feed",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "Soft Skills",
    slug: "soft-skills",
    image: "soft-skills-logo.jpg",
    url: "https://softskills.audio/feed.xml",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  // Todo Check if is really broken
  // {
  //   title: "Command Line Heroes",
  //   slug: "command-line-heroes",
  //   image: "command-line-heroes-logo.jpg",
  //   url: "https://feeds.pacific-content.com/commandlineheroes",
  //   tags: ["Programming", "Reviewing"],
  // },
  {
    title: "base.cs",
    slug: "base-cs",
    image: "base-cs-logo.jpg",
    url: "http://feeds.codenewbie.org/basecs_podcast.xml",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "Coder Radio",
    slug: "coder-radio",
    image: "coder-radio-logo.jpg",
    url: "https://feeds.jupiterbroadcasting.com/coder",
    tags: [
      "Programming",
      "Reviewing",
    ],
  },
  {
    title: "Software Gone Wild",
    slug: "software-gone-wild",
    image: "software-gone-wild-logo.jpg",
    url: "http://feed.ipspace.net/podcast/software.gone.wild?rss=1",
    tags: [
      "Networking",
      "Reviewing",
    ],
  },
  {
    title: "PING",
    slug: "ping",
    image: "ping-logo.jpg",
    url: "https://feeds.blubrry.com/feeds/ping_podcast.xml",
    tags: [
      "Networking",
      "Reviewing",
    ],
  },
  {
    title: "Heavy Strategy",
    slug: "heavy-strategy",
    image: "heavy-strategy-logo.jpg",
    url: "https://feeds.packetpushers.net/heavystrategy",
    tags: [
      "Networking",
      "Reviewing",
    ],
  },
  {
    title: "Heavy Networking",
    slug: "heavy-networking",
    image: "heavy-networking-logo.jpg",
    url: "https://feeds.packetpushers.net/PacketPushersWeeklyPodcast",
    tags: [
      "Networking",
      "Reviewing",
    ],
  },
  {
    title: "Linux Dev Time",
    slug: "linux-dev-time",
    image: "linux-dev-time-logo.jpg",
    url: "https://latenightlinux.com/feed/extra",
    tags: [
      "Progamming",
      "Reviewing",
      "Tech",
    ],
  },
  {
    title: "Linux After Dark",
    slug: "linux-after-dark",
    image: "linux-after-dark-logo.jpg",
    url: "https://linuxafterdark.net/feed/podcast",
    tags: [
      "Tech",
      "Reviewing",
    ],
  },
  {
    title: "Hacking Humans",
    slug: "hacking-humans",
    image: "hacking-humans-logo.jpg",
    url: "https://feeds.megaphone.fm/hacking-humans",
    tags: [
      "Cybersecurity",
      "Tech",
      "Reviewing",
    ],
  },
  {
    title: "Compromising Positions",
    slug: "compromising-positions",
    image: "compromising-positions-logo.jpg",
    url: "https://www.compromisingpositions.co.uk/podcast?format=rss",
    tags: [
      "Cybersecurity",
      "Tech",
      "Reviewing",
    ],
  },
  {
    title: "The We Society",
    slug: "the-we-society",
    image: "the-we-society-logo.jpg",
    url: "https://audioboom.com/channels/5079081.rss",
    tags: [
      "Social Sciences",
      "Society",
      "Reviewing",
    ],
  },
].sort((a, b) => {
  const aIsFavorite = a.tags.includes("Favorite")
  const bIsFavorite = b.tags.includes("Favorite")

  if (aIsFavorite && !bIsFavorite) return -1
  if (!aIsFavorite && bIsFavorite) return 1
  return 0
})
