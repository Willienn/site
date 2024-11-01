export const FEEDS = [
  {
    title: "Smashing Security",
    slug: "smashing-security",
    image: "smashing-security-logo.jpg",
    description: "Text to describe what is and why i like it",
    url: "https://feeds.captivate.fm/smashing-security/",
    tags: ["Progamming","Favorite"]
  },
  {
    title: "Darknet Diaries",
    slug: "darknet-diares",
    image: "darknet-diares-logo.jpg",
    description: "Text to describe what is and why i like it",
    url: "https://podcast.darknetdiaries.com",
    tags: ["Progamming","Favorite"]
  },
  {
    title: "The Adventure Zone",
    slug: "the-adventure-zone",
    image: "the-adventure-zone-logo.jpg",
    description: "Text to describe what is and why i like it",
    url: "https://feeds.simplecast.com/cYQVc__c",
    tags: ["RPG","Favorite"]
    
  },
  {
    title: 'Javascript Jabber',
    slug: "javascript-jabber",
    image: "javascript-jabber-logo.jpg",
    url: "https://www.spreaker.com/show/6102064/episodes/feed",
    tags: ["Progamming","Reviewing"]
  },
  {
    title: 'Programming Throwdown',
    slug: "programming-throwdown",
    image: "programming-throwdown-logo.jpg",
    url:"https://feeds.transistor.fm/programming-throwdown",
    tags: ["Progamming","Reviewing"]
  },
  {
    title: 'Shop Talk',
    slug: "shop-talk",
    image: "shop-talk-logo.jpg",
    url:"https://shoptalkshow.com/feed/podcast/default-podcast/",
    tags: ["Progamming","Reviewing"]
  },
  {
    title: 'Algorithms + Data Structures = Programs',
    slug: "adsp",
    image: "adsp-logo.jpg",
    url:"https://feeds.buzzsprout.com/1501960.rss",
    tags: ["Progamming","Reviewing"]
  },
  {
    title: 'SE Radio',
    slug: "se-radio",
    image: "se-radio-logo.jpg",
    url:"https://seradio.libsyn.com/rss",
    tags: ["Progamming","Reviewing"]
  },
  {
    title: 'Syntax',
    slug: "syntax",
    image: "syntax-logo.jpg",
    url:"https://feed.syntax.fm/",
    tags: ["Progamming","Reviewing"]
  }
  
].sort((a, b) => {
  const aIsFavorite = a.tags.includes("Favorite");
  const bIsFavorite = b.tags.includes("Favorite");

  if (aIsFavorite && !bIsFavorite) return -1;
  if (!aIsFavorite && bIsFavorite) return 1;
  return 0;
})

// TODO
// https://changelog.com/jsparty/feed jsparty
// https://access.acast.com/rss/61954547cb03c875f7617118/default Daily Tech News Show
// https://www.relay.fm/cortex/feed  // ? Cortex
// https://softskills.audio/feed.xml Soft Skills
// https://feeds.pacific-content.com/commandlineheroes command line heroes
// http://feeds.codenewbie.org/basecs_podcast.xml base.cs
// https://feeds.jupiterbroadcasting.com/coder coder.radio
// ? Networking
// http://feed.ipspace.net/podcast/software.gone.wild?rss=1 software gone wild
// https://feeds.blubrry.com/feeds/ping_podcast.xml PING
// https://feeds.packetpushers.net/heavystrategy heavystrategy
// https://feeds.packetpushers.net/PacketPushersWeeklyPodcast  Heavy Networking