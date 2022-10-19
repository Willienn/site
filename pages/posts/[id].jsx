import React from "react";
import {
  Heading,
  Box,
  Image,
  Center,
  Container,
  VStack,
  Text,
} from "@chakra-ui/react";
import Nav from "../../components/nav";
import {getBlocks, getDatabase, getPage} from "../../lib/notion";
import {databaseId} from "../index";

export default function Posts({post, blocks}) {
  // console.log(blocks);
  return (
    <Box>
      <Nav />
      <VStack>
        <Image
          alt="Banner do Post"
          w="100%"
          h="30vh"
          objectFit="cover"
          objectPosition="center 70%"
          src={post.cover.external.url}
        />
        <Container>
          <Heading>{post.properties.Name.title[0].text.content}</Heading>
          {blocks.map((block) => {
            return block.paragraph.rich_text.map((text, idx) => {
              console.log(text.plain_text);
              return (
                <Text key={idx} maxW="100vw" color="white">
                  {text.plain_text}
                </Text>
              );
            });
          })}
        </Container>
      </VStack>
    </Box>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({params: {id: page.id}})),
    fallback: true,
  };
};

export async function getStaticProps({params}) {
  const {id} = params;
  const post = await getPage(id);
  const blocks = await getBlocks(id);
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });
  return {
    props: {
      post,
      blocks: blocksWithChildren,
    },
  };
}
