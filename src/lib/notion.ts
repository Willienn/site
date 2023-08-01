import { Client } from "@notionhq/client";
import { Block, BlockWithChildren } from "@/types/blocks";
import { DatabaseItem } from "@/types/database";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { IPost } from "@/types/posts";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
  });
  const posts = await extractPosts(response.results);
  return posts;
}

export async function getPost(slug: string) {
  try {
    const posts = await getPosts();
    const post = posts.find((post) => post.tags.Slug.url === slug);
    if (!post) {
      throw new Error("Post not found.");
    }

    const filteredPageId = post.id;
    const blocks = await getPostBlocks(filteredPageId);

    return { blocks, post, pageError: null };
  } catch (error) {
    const typedError = error as Error;
    return { blocks: null, post: null, pageError: typedError.message };
  }
}

export async function getBlocks(blockId: string): Promise<Block[]> {
  const blocks: Block[] = [];
  let response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 25,
  });

  blocks.push(...response.results);

  while (response.has_more && response.next_cursor) {
    response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 25,
      start_cursor: response.next_cursor,
    });
    blocks.push(...response.results);
  }

  return blocks;
}

async function getChildren(block: Block): Promise<BlockWithChildren> {
  const children: BlockWithChildren[] = [];
  if (block.has_children) {
    const childBlocks = await getBlocks(block.id);
    const childBlocksWithChildren = await Promise.all(
      childBlocks.map(async (childBlock) => await getChildren(childBlock)),
    );
    children.push(...childBlocksWithChildren);
  }
  return {
    ...block,
    childblocks: children,
  };
}

export async function getPostBlocks(
  pageId: string,
): Promise<BlockWithChildren[]> {
  const blocks: Block[] = await getBlocks(pageId);
  const blocksWithChildren: BlockWithChildren[] = await Promise.all(
    blocks.map(async (block: Block) => await getChildren(block)),
  );
  return blocksWithChildren;
}

async function extractPosts(
  databaseItems: Array<
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  >,
): Promise<IPost[]> {
  const posts: IPost[] = await Promise.all(
    databaseItems.map(async (postInDB: DatabaseItem) => {
      const title = postInDB.properties.Name.title[0].plain_text;
      const date = postInDB.last_edited_time;
      const url = postInDB.url;
      const tags = postInDB.properties;
      const cover = postInDB.cover;
      const publishdate = postInDB.created_time;

      const post: IPost = {
        id: postInDB.id,
        title,
        modifiedDate: date,
        url,
        cover,
        tags,
        publishDate: publishdate || date,
      };

      return post;
    }),
  );

  return posts;
}
