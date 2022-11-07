import {
  Box,
  Center,
  Code,
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
import Footer from "../components/footer";
import {getDatabase} from "../lib/notion";
import Link from "next/link";
import Head from "next/head";
import useIsMobile from "../hooks/isMobile";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function _landing({posts}) {
  const isMobile = useIsMobile();

  return (
    <>
      <Head>
        <title>Daily Codes</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" sizes="16x16 32x32 64x64" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="196x196"
          href="/favicon-192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="160x160"
          href="/favicon-160.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/favicon-64.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16.png"
        />
        <link rel="apple-touch-icon" href="/favicon-57.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon-114.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon-72.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon-144.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon-60.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon-120.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon-76.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon-152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/favicon-144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </Head>
      <Nav />
      <Center>
        <Flex mx="10px" direction="column" mb="10vh" mt="5vh">
          <Heading mb="5px" ml="-2.5vw" fontSize={["2em", "3em"]}>
            <Link fontFamily="Fira Code" className="link" href="/about">
              Willien
            </Link>
          </Heading>
          {isMobile ? (
            <Code
              bgColor="transparent"
              color="#d0d0d0"
              whiteSpace="pre-wrap"
              fontSize={["1em", "1.4em"]}
              w="auto"
            >
              {`{
 age: 20,
 occupation: "Progamador Front-End"
 siteDescription: "Meu blog pessoal,
 para postar notícias,
 coisas úteis e poemas/textos.
 (todos autorais)",
}`}
            </Code>
          ) : (
            <Code
              bgColor="transparent"
              color="#d0d0d0"
              whiteSpace="pre-wrap"
              fontSize={[".9em", "1.4em"]}
              w="auto"
            >
              {`{
 age: 20,
 occupation: "Progamador Front-End"
 siteDescription: "Meu blog pessoal, para postar notícias,
 coisas úteis e poemas/textos autorais",
}`}
            </Code>
          )}
        </Flex>
      </Center>
      <Center>
        <Flex mb="10vh" direction="column" gap="30px">
          <Heading textAlign="center" fontSize={["2em", "3em"]}>
            Posts
          </Heading>
          <SimpleGrid columns={2} spacing={5}>
            {posts.map((post) => {
              return (
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
              );
            })}
          </SimpleGrid>
        </Flex>
      </Center>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  return {
    props: {
      posts: database,
    },
    revalidate: 1000,
  };
};
