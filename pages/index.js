import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Header from "../components/header";
import {Client} from "@notionhq/client";
import Link from "next/link";
import PostCard from "../components/postCard";

export default function _landing({Posts}) {
  console.log(Posts);
  return (
    <>
      <Header />
      <Center ml="-10vw">
        <Container>
          <Box mb="10vh">
            <Heading ml="-2.5vw" fontSize="3em">
              Willien
            </Heading>
            <Text fontSize="1.2em" w="60vw">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              enim natus alias harum asperiores quas, maiores aspernatur,
              accusamus ipsa praesentium earum velit repudiandae vitae tenetur
              autem ratione ex eius obcaecati.
            </Text>
          </Box>
        </Container>
      </Center>
      <Center>
        <Flex mb="100px" direction="column" gap="10px">
          <Heading textAlign="center" fontSize="3em">
            Posts
          </Heading>
          <SimpleGrid columns={2} spacing={16}>
            {Posts.map((post, idx) => {
              return (
                <>
                  <PostCard
                    key={idx}
                    postLink={`/posts/${post.id}`}
                    postImg={post.cover?.external?.url}
                    postTitle={post.properties.Name.title[0].text.content}
                  />
                </>
              );
            })}
          </SimpleGrid>
        </Flex>
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  const notion = new Client({auth: process.env.NOTION_API_KEY});
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  return {
    props: {
      Posts: response.results,
    },
  };
}
