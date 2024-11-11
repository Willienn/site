import {
  BlockQuote,
  CodeBlock,
  Heading1,
  Heading2,
  Heading3,
  ListItem,
  OrderedList,
  Paragraph,
  UnorderedList,
} from "@/components/markdownBlocks"
import matter from "gray-matter"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Frontmatter = {
  banner: string
  title: string
}

const markdownConfig = {
  remarkPlugins: [remarkGfm],
  components: {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    p: Paragraph,
    ol: OrderedList,
    ul: UnorderedList,
    li: ListItem,
    blockquote: BlockQuote,
    code: CodeBlock,
  },
}

export default async function Post({ post }: { post: string }) {
  let data: Frontmatter
  let content: string

  try {
    const parsed = matter(post)
    data = parsed.data as Frontmatter
    content = parsed.content
  } catch (error) {
    console.error("Error parsing post markdown:", error)
    return <p>Failed to load post content.</p>
  }

  const { banner, title } = data

  return (
    <main className="flex flex-col gap-8">
      {/* Banner Image */}
      <div className="md:t-6 aspect-[2/1] h-[45rem] w-full border-x-[30px] border-y-[25px] border-x-slate-900 border-y-stone-950 lg:aspect-[3/1] lg:border-x-[60px] lg:border-y-[50px]">
        <Image
          className="h-full w-full object-cover"
          width={1200}
          height={800}
          quality={80}
          alt="Banner do Post"
          src={banner}
          priority
        />
      </div>
      {/* Title for SEO */}
      <h1 className="self-center font-roboto_slab text-4xl font-bold">
        {title}
      </h1>
      {/* Article Content */}
      <article className="flex w-fit max-w-[700px] flex-col gap-8 self-center px-4">
        <section className="mb-4 flex w-full flex-col items-center justify-center">
          {/* @ts-ignore */}
          <ReactMarkdown {...markdownConfig}>{content}</ReactMarkdown>
        </section>
      </article>
    </main>
  )
}
