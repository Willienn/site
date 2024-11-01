export interface rssResponse {
  items: Item[]
  feedUrl: string
  image: Image
  paginationLinks: PaginationLinks
  pagination: { [key: string]: any }
  title: string
  description: string
  managingEditor: string
  generator: string
  link: string
  language: string
  copyright: string
  lastBuildDate: string
  itunes: Itunes2
}

export interface Item {
  creator: string
  title: string
  link: string
  pubDate: string
  "content:encoded": string
  "content:encodedSnippet": string
  enclosure: Enclosure
  "dc:creator": string
  content: string
  contentSnippet: string
  guid: string
  isoDate: string
  itunes: Itunes
  image: string
}

export interface Enclosure {
  url: string
  length: string
  type: string
}

export interface Itunes {
  author: string
  explicit: string
  duration: string
  image: string
  episode?: string
  episodeType: string
  summary?: string
}

export interface Image {
  link: string
  url: string
  title: string
}

export interface PaginationLinks {
  self: string
}

export interface Itunes2 {
  owner: Owner
  image: string
  categories: string[]
  categoriesWithSubs: CategoriesWithSub[]
  author: string
  subtitle: string
  summary: string
  explicit: string
}

export interface Owner {
  name: string
}

export interface CategoriesWithSub {
  name: string
  subs?: Sub[]
}

export interface Sub {
  name: string
}
