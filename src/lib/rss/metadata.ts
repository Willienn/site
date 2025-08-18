/**
 * Favorite > Recomended > Reviewing
 */
export const tags = {
  podcast_tags: [
    "Social Sciences",
    "Cybersecurity",
    "Programming",
    "Networking",
    "Red Hat",
    "Linux",
    "Tech",
    "RPG",
    "IT",
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
    image: "smashing-security.jpg",
    description: "Text to describe what is and why i like it",
    url: "https://feeds.captivate.fm/smashing-security/",
    tags: ["Cybersecurity", "Favorite", "Recommended"],
  },
  {
    title: "Darknet Diaries",
    slug: "darknet-diaries",
    image: "darknet-diaries.jpg",
    description: "Text to describe what is and why i like it",
    url: "https://podcast.darknetdiaries.com",
    tags: ["Cybersecurity", "Favorite", "Recommended"],
  },
  {
    title: "The Adventure Zone",
    slug: "the-adventure-zone",
    image: "the-adventure-zone.jpg",
    description: "Text to describe what is and why i like it",
    url: "https://feeds.simplecast.com/cYQVc__c",
    tags: ["RPG", "Favorite", "Recommended"],
  },
  {
    title: "Javascript Jabber",
    slug: "javascript-jabber",
    image: "javascript-jabber.jpg",
    url: "https://www.spreaker.com/show/6102064/episodes/feed",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Programming Throwdown",
    slug: "programming-throwdown",
    image: "programming-throwdown.jpg",
    url: "https://feeds.transistor.fm/programming-throwdown",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Shop Talk",
    slug: "shop-talk",
    image: "shop-talk.jpg",
    url: "https://shoptalkshow.com/feed/podcast/default-podcast/",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Algorithms + Data Structures = Programs",
    slug: "adsp",
    image: "adsp.jpg",
    url: "https://feeds.buzzsprout.com/1501960.rss",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "SE Radio",
    slug: "se-radio",
    image: "se-radio.jpg",
    url: "https://seradio.libsyn.com/rss",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Syntax",
    slug: "syntax",
    image: "syntax.jpg",
    url: "https://feed.syntax.fm/",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "JSParty",
    slug: "jsparty",
    image: "jsparty.jpg",
    url: "https://changelog.com/jsparty/feed",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Daily Tech News Show",
    slug: "daily-tech-news-show",
    image: "daily-tech-news-show.jpg",
    url: "https://access.acast.com/rss/61954547cb03c875f7617118/default",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Cortex",
    slug: "cortex",
    image: "cortex.jpg",
    url: "https://www.relay.fm/cortex/feed",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Soft Skills",
    slug: "soft-skills",
    image: "soft-skills.jpg",
    url: "https://softskills.audio/feed.xml",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Command Line Heroes",
    description:
      "Command Line Heroes tells the epic true tales of how developers, programmers, hackers, geeks, and open source rebels attempt the extraordinary and persevere.",
    slug: "command-line-heroes",
    image: "command-line-heroes.jpg",
    url: "https://feeds.simplecast.com/vUHP7wpf",
    tags: ["Programming", "Red Hat", "Reviewing"],
  },
  {
    title: "Base.cs",
    slug: "base-cs",
    image: "base-cs.jpg",
    url: "http://feeds.codenewbie.org/basecs_podcast.xml",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Coder Radio",
    slug: "coder-radio",
    image: "coder-radio.jpg",
    url: "https://feeds.jupiterbroadcasting.com/coder",
    tags: ["Programming", "Reviewing"],
  },
  {
    title: "Software Gone Wild",
    slug: "software-gone-wild",
    image: "software-gone-wild.jpg",
    url: "http://feed.ipspace.net/podcast/software.gone.wild?rss=1",
    tags: ["Networking", "Reviewing"],
  },
  {
    title: "PING",
    slug: "ping",
    image: "ping.jpg",
    url: "https://feeds.blubrry.com/feeds/ping_podcast.xml",
    tags: ["Networking", "Reviewing"],
  },
  {
    title: "Heavy Strategy",
    slug: "heavy-strategy",
    image: "heavy-strategy.jpg",
    url: "https://feeds.packetpushers.net/heavystrategy",
    tags: ["Networking", "Reviewing"],
  },
  {
    title: "Heavy Networking",
    slug: "heavy-networking",
    image: "heavy-networking.jpg",
    url: "https://feeds.packetpushers.net/PacketPushersWeeklyPodcast",
    tags: ["Networking", "Reviewing"],
  },
  {
    title: "Linux Dev Time",
    slug: "linux-dev-time",
    image: "linux-dev-time.jpg",
    url: "https://latenightlinux.com/feed/extra",
    tags: ["Progamming", "Reviewing", "Linux", "Tech"],
  },
  {
    title: "Linux After Dark",
    slug: "linux-after-dark",
    image: "linux-after-dark.jpg",
    url: "https://linuxafterdark.net/feed/podcast",
    tags: ["Tech", "Linux", "Reviewing"],
  },
  {
    title: "Hacking Humans",
    slug: "hacking-humans",
    image: "hacking-humans.jpg",
    url: "https://feeds.megaphone.fm/hacking-humans",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "Compromising Positions",
    slug: "compromising-positions",
    image: "compromising-positions.jpg",
    url: "https://www.compromisingpositions.co.uk/podcast?format=rss",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "The We Society",
    slug: "the-we-society",
    image: "the-we-society.jpg",
    url: "https://audioboom.com/channels/5079081.rss",
    tags: ["Social Sciences", "Society", "Reviewing"],
  },
  {
    title: "Cyberwire Daily Podcast",
    slug: "cyberwire-daily-podcast",
    image: "cyberwire-daily-podcast.jpg",
    url: "https://feeds.megaphone.fm/cyberwire-daily-podcast",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "Control Loop",
    slug: "control-loop",
    image: "control-loop.jpg",
    url: "https://feeds.megaphone.fm/control-loop",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "CSO Perspectives",
    slug: "cso-perspectives",
    image: "cso-perspectives.jpg",
    url: "https://feeds.megaphone.fm/cyberwire-cso-perspectives-public",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "8th Layer Insights",
    slug: "8th-layer-insights",
    image: "8th-layer-insights.jpg",
    url: "https://feeds.megaphone.fm/8th-layer-insights",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "Threat Vector",
    slug: "threat-vector",
    image: "threat-vector.jpg",
    url: "https://feeds.megaphone.fm/unit42threatvector",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "Only Malware in the Building",
    slug: "only-malware-in-the-building",
    image: "only-malware-in-the-building.jpg",
    url: "https://feeds.megaphone.fm/only-malware-in-the-building",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "Cyberwire Shadowspeak",
    slug: "cyberwire-shadowspeak",
    image: "cyberwire-shadowspeak.jpg",
    url: "https://feeds.megaphone.fm/cyberwire-shadowspeak",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "Faik Files",
    slug: "faik-files",
    image: "faik-files.jpg",
    url: "https://feeds.megaphone.fm/faikfiles",
    tags: ["Cybersecurity", "Tech", "Reviewing"],
  },
  {
    title: "Code Comments",
    description:
      "On Code Comments, host and technologist Burr Sutter speaks with experienced professionals on the challenges along the way from whiteboard to deployment.",
    slug: "code-comments",
    image: "code-comments.jpg",
    url: "https://feeds.simplecast.com/qdjfQuGX",
    tags: ["IT", "Tech", "Red Hat", "Reviewing"],
  },
  {
    title: "Compiler",
    description:
      "Compiler gives you perspectives and insights from the tech industry—free from jargon and judgment. We’re here to help new IT professionals understand what’s going on.",
    slug: "compiler",
    image: "compiler.jpg",
    url: "https://feeds.simplecast.com/Ynq4lw9w",
    tags: ["Tech", "Red Hat", "IT", "Reviewing"],
  },
  {
    title: "The Hedge",
    description:
      "The Hedge is a podcast about the world of open source software, hosted by Red Hat's Chris Short and Matt Yonkovit.",
    slug: "the-hedge",
    image: "the-hedge.jpg",
    url: "http://rule11.tech/category/content-type/podcast",

    tags: ["Tech", "Red Hat", "IT", "Reviewing"],
  },
  {
    title: "Level Design Lobby",
    description:
      "The Level Design Lobby, breaks down game and level design techniques, showing how they are used within games, as well as how we can improve upon them.",
    slug: "level-design-lobby",
    image: "level-design-lobby.jpg",
    url: "http://feeds.libsyn.com/106478/rss",
    tags: ["Tech", "Game Dev", "Reviewing"],
  },
]
  .sort(function (a, b) {
    if (a.title < b.title) {
      return -1
    }
    if (a.title > b.title) {
      return 1
    }
    return 0
  })
  .sort((a, b) => {
    const aIsFavorite = a.tags.includes("Favorite")
    const bIsFavorite = b.tags.includes("Favorite")

    if (aIsFavorite && !bIsFavorite) return -1
    if (!aIsFavorite && bIsFavorite) return 1
    return 0
  })
// If any podcast is broken check if they change the feed url
// and some was broken cors policy, bc librewolf and firefox fingerprinting protection
