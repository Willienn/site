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
import Nav from "../components/nav";
import PostCard from "../components/postCard";
import {getDatabase} from "../lib/notion";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function _landing({posts}) {
  return (
    <>
      <Nav />
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
            {posts.map((post, idx) => {
              return (
                <>
                  <PostCard
                    key={post.id}
                    postLink={`/posts/${post.id}`}
                    postImg={
                      post.cover?.external?.url !== undefined
                        ? post.cover.external.url
                        : post.cover.file.url
                    }
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

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
