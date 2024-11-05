import { Block, BlockWithChildren } from "@/types/blocks"
import { DatabaseItem } from "@/types/database"
import { IPost } from "@/types/posts"
import { Client } from "@notionhq/client"
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

// Fetch posts from the Notion database
export async function getPosts(): Promise<IPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || "",
    })
    return extractPosts(response.results)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

// Fetch blocks from a specific block ID, with pagination
export async function getBlocks(blockId: string): Promise<Block[]> {
  const blocks: Block[] = []
  let cursor: string | undefined

  try {
    do {
      const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 25,
        start_cursor: cursor,
      })

      blocks.push(...response.results)
      cursor = response.next_cursor
    } while (cursor)

    return blocks
  } catch (error) {
    console.error(`Error fetching blocks for block ID ${blockId}:`, error)
    return []
  }
}

// Recursively fetch children blocks
async function getChildren(block: Block): Promise<BlockWithChildren> {
  if (!block.has_children) {
    return {
      ...block,
      childblocks: [],
    }
  }

  try {
    const childBlocks = await getBlocks(block.id)
    const childBlocksWithChildren = await Promise.all(
      childBlocks.map(getChildren)
    )

    return {
      ...block,
      childblocks: childBlocksWithChildren,
    }
  } catch (error) {
    console.error(`Error fetching children for block ID ${block.id}:`, error)
    return {
      ...block,
      childblocks: [],
    }
  }
}

// Fetch blocks for a specific page and their children
export async function getPostBlocks(
  pageId: string
): Promise<BlockWithChildren[]> {
  try {
    const blocks = await getBlocks(pageId)
    return Promise.all(blocks.map(getChildren))
  } catch (error) {
    console.error(`Error fetching post blocks for page ID ${pageId}:`, error)
    return []
  }
}

// Extract posts from the database response
async function extractPosts(
  databaseItems: Array<
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  >
): Promise<IPost[]> {
  return Promise.all(
    databaseItems.map(async (item) => {
      try {
        const { id, properties, last_edited_time, created_time, cover, url } =
          item as DatabaseItem

        if (!properties?.Name?.title) {
          throw new Error("Invalid properties structure.")
        }

        const title = properties.Name.title[0]?.plain_text || "Untitled"
        const publishDate = created_time || last_edited_time

        return {
          id,
          title,
          modifiedDate: last_edited_time,
          url,
          cover,
          tags: properties,
          publishDate,
        } as IPost
      } catch (error) {
        console.error("Failed to extract post:", error)
        return null as unknown as IPost
      }
    })
  ).then((posts) => posts.filter((post) => post !== null))
}

// Get a specific post by its slug
export async function getPost(slug: string) {
  try {
    const posts = await getPosts()
    const post = posts.find(({ tags }) => tags?.Slug?.url === slug)

    if (!post) {
      throw new Error("Post not found.")
    }

    const blocks = await getPostBlocks(post.id)

    return {
      blocks,
      post,
      pageError: null,
    }
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return {
      blocks: null,
      post: null,
      pageError: (error as Error).message,
    }
  }
}
