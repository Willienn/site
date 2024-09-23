import { getPost } from "@/lib/notion"
import { Block } from "@/types/blocks"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Fragment } from "react"
import Text from "./text"

export const dynamic = "force-static"

function renderNestedList(block: Block) {
  const { type } = block
  const value = block[type]
  if (!value) return null

  const isNumberedList = value.children[0].type === "numbered_list_item"

  if (isNumberedList) {
    return (
      <ol>
        {value.children.map((block: Block, idx: number) =>
          renderBlock(block, idx)
        )}
      </ol>
    )
  }

  return (
    <p className="mt-2.5">
      {value.children.map((block: Block, idx: number) =>
        renderBlock(block, idx)
      )}
    </p>
  )
}

function renderBlock(block: Block, idx: number) {
  const { type, id } = block
  const value = block[type]
  switch (type) {
    case "paragraph": {
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      )
    }
    case "heading_1": {
      return (
        <h1 className="py-7 font-roboto_slab text-2xl no-underline md:text-4xl">
          <Text text={value.rich_text} />
        </h1>
      )
    }
    case "heading_2": {
      return (
        <h2 className="py-5 font-roboto_slab text-lg md:text-2xl lg:text-3xl">
          <Text text={value.rich_text} />
        </h2>
      )
    }
    case "heading_3": {
      return (
        <h3 className="my-2.5 font-roboto_slab text-lg md:text-xl lg:text-2xl">
          <Text text={value.rich_text} />
        </h3>
      )
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </>
      )
    case "to_do": {
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      )
    }
    case "toggle": {
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map((block: Block, idx: number) => (
            <Fragment key={block.id}>{renderBlock(block, idx)}</Fragment>
          ))}
        </details>
      )
    }
    case "child_page": {
      return <p>{value.title}</p>
    }
    case "image": {
      const src =
        value.type === "external" ? value.external.url : value.file.url
      const caption = value.caption
        ? value.caption[0]?.plain_text
        : "Imagem Ilustrativa"
      return (
        <figure className="my-10px">
          <img className="h-auto w-auto" src={src} alt={caption} />
        </figure>
      )
    }
    case "divider": {
      return <hr className="my-4" key={id} />
    }
    case "quote": {
      return (
        <p
          className="font-xs mb-2.5 border-l-2 border-red-500 bg-stone-950 py-2 pl-3 font-poppins italic"
          key={id}
        >
          <Text text={value.rich_text} />
        </p>
      )
    }
    case "code": {
      return (
        <pre
          className="line flex flex-wrap overflow-auto bg-zinc-800 px-1 py-0.5 font-mono leading-9"
          key={id}
        >
          {value.rich_text[0].plain_text}
        </pre>
      )
    }
    case "file": {
      const src_file =
        value.type === "external" ? value.external.url : value.file.url
      const splitSourceArray = src_file.split("/")
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
      const caption_file = value.caption ? value.caption[0]?.plain_text : ""
      return (
        <figure>
          <div className="px-1 py-0.5">
            📎
            <a className="text-inherit no-underline" href={src_file}>
              {lastElementInArray.split("?")[0]}
            </a>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      )
    }
    case "bookmark": {
      const href = value.url
      return (
        <Link href={href} target="_brank" className="mb-2.5 block">
          {href}
        </Link>
      )
    }
    default: {
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`
    }
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const { post } = await getPost(slug)

  return {
    title: post?.title,
    openGraph: {
      images: post?.cover?.external?.url || post?.cover?.file?.url,
    },
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { blocks, post, pageError } = await getPost(slug)

  if (!blocks && pageError !== undefined) {
    return notFound()
  }

  return (
    <main className="flex flex-col gap-8">
      <div className="md:t-6 aspect-[2/1] h-[45rem] w-full border-x-[30px] border-y-[25px] border-x-slate-900 border-y-stone-950 lg:aspect-[3/1] lg:border-x-[60px] lg:border-y-[50px]">
        <img
          className="h-full w-full object-cover"
          alt="Banner do Post"
          src={post?.cover?.external?.url || post?.cover?.file?.url}
        />
      </div>
      <article className="flex w-fit max-w-[700px] flex-col gap-8 self-center px-4">
        <h1 className="self-center font-roboto_slab text-4xl font-bold">
          {post.title}
        </h1>
        <section className="mb-4 flex w-full flex-col items-center justify-center">
          {blocks?.map((block: Block, idx) => (
            <div className="w-[80svw] md:w-[70svw] lg:w-[50svw]" key={block.id}>
              {renderBlock(block, idx)}
            </div>
          ))}
        </section>
      </article>
    </main>
  )
}
