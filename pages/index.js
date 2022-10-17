import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Header from "../components/header";
import {Client} from "@notionhq/client";
import Link from "next/link";

export default function _landing({response}) {
  console.log();
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
        <Flex direction="column" gap="10px">
          <Heading textAlign="center" fontSize="3em">
            Posts
          </Heading>
          <HStack>
            <Link href="/">
              <Box
                borderRadius="8px"
                w="400px"
                h="200px"
                bgColor="#2f2f2f"
                overflow="hidden"
              >
                <Image
                  opacity="60%%"
                  alt="logo"
                  w="400px"
                  h="150px"
                  src={response[0].cover.external.url}
                />
                <Text px="25px">{response[0].properties.Name.title[0].text.content}</Text>
              </Box>
            </Link>
            <Spacer />
            <Box borderRadius="8px" w="400px" h="200px" bgColor="#2f2f2f"></Box>
          </HStack>
          <Spacer />
          <HStack>
            <Box borderRadius="8px" w="400px" h="200px" bgColor="#2f2f2f"></Box>
            <Spacer />
            <Box borderRadius="8px" w="400px" h="200px" bgColor="#2f2f2f"></Box>
          </HStack>
        </Flex>
      </Center>
    </>
  );
}

export async function getStaticProps() {
  const notion = new Client({auth: process.env.NOTION_API_KEY});
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  return {
    props: {
      response: response.results,
    },
    revalidate: 1,
  };
}
