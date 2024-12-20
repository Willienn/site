import {
  BlockQuote,
  CodeBlock,
  Heading1,
  Heading2,
  Heading3,
  HorizontalRule,
  InlineCode,
  ListItem,
  OrderedList,
  Paragraph,
  UnorderedList,
} from "@/components/markdownBlocks"
import matter from "gray-matter"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

const markdownConfig = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeRaw],
  components: {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    hr: HorizontalRule,
    p: Paragraph,
    ol: OrderedList,
    ul: UnorderedList,
    li: ListItem,
    blockquote: BlockQuote,
    // Render block-level code with CodeBlock
    pre({ node, ...props }) {
      return <>{props.children}</>
    },
    // Render inline code with InlineCode, and use CodeBlock for triple-backtick blocks
    code: ({ inline, children, ...props }) =>
      inline ? (
        <InlineCode {...props}>{children}</InlineCode> // For single backticks
      ) : (
        <CodeBlock {...props}>{children}</CodeBlock> // For triple backticks
      ),
  },
}

type Frontmatter = {
  banner: string
  title: string
}

export default async function Post({
  post,
  altImg,
}: {
  post: string
  altImg: string
}) {
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
      <h1 className="self-center font-roboto_slab text-4xl font-bold tracking-tight">
        {title}
      </h1>
      {/* Article Content */}
      <article className="mb-4 flex w-full max-w-[800px] flex-col justify-center gap-2 self-center px-4 font-sans leading-relaxed tracking-normal text-stone-200">
        {/* @ts-ignore */}
        <ReactMarkdown {...markdownConfig}>{content}</ReactMarkdown>
      </article>
    </main>
  )
}
