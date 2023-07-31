import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getDatabase() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  return response.results;
};



  export async function getPost(slug){
    let database
    let pageId
    let blocks
    let page
    let pageError
    try{

     database = await  getDatabase()
     pageId = database.filter((post)=>post.properties.Slug.url ===slug)[0].id
     blocks = await getBlocks(pageId)
     page = await getPage(pageId)
    }catch (error){
      pageError = error
    }
    return { blocks, page, pageError}
  }

export async function getPage (pageId)  {

  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export async function getBlocks(pageId) {
  const blocks = [];
  let cursor;

  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: pageId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;

};
