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

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function _landing({posts}) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
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
        <Container>
          <Box mb="10vh">
            <Heading mb="5px" ml="-2.5vw" fontSize="3em">
              <Link fontFamily="Fira Code" className="link" href="/about">
                Willien
              </Link>
            </Heading>
            <Code whiteSpace="pre-wrap" fontSize="1.8em" w="60vw">
              {`{
 age: 20,
 occupation: "Progamador Front-End"
 siteDescription: "Meu blog pessoal, para postar notícias,
 coisas úteis e poemas/textos autorais",
}`}
            </Code>
          </Box>
        </Container>
      </Center>
      <Center>
        <Flex mb="100px" direction="column" gap="10px">
          <Heading textAlign="center" fontSize="3em">
            Posts
          </Heading>
          <SimpleGrid columns={2} spacing={24}>
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
    revalidate: 1,
  };
};
