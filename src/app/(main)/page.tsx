import { Center, Code, Flex, Heading, SimpleGrid } from "@CS-chakra";
import React from "react";
import Link from "next/link";
import { getPosts } from "@/lib/notion";
import PostCard from "@/components/postCard";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
});

export default async function Page() {
  const age = new Date().getFullYear() - 2002;

  const posts = await getPosts();
  console.log(posts, "posts");
  return (
    <>
      <Center>
        <Flex mx="10px" direction="column" mb="10svh" mt="5svh">
          <Heading mb="5px" ml="-2.5svw" fontSize={["2em", "3em"]}>
            <Link className={firaCode.className + " link"} href="/about">
              Willien
            </Link>
          </Heading>
          <Code
            bgColor="transparent"
            color="#d0d0d0"
            whiteSpace="pre-wrap"
            fontSize={["1em", "1.4em"]}
            w="auto"
          >
            {`{
 age: ${age},
 occupation: "Front-End Programmer"
 siteDescription: "Blog to post
 whatever i want (Mostly mine)."
}`}
          </Code>
        </Flex>
      </Center>
      <Center>
        <Flex
          h={["35svh", "50svh", "50svh"]}
          mb="10svh"
          direction="column"
          gap="30px"
        >
          <Heading textAlign="center" fontSize={["2em", "3em"]}>
            Posts
          </Heading>
          <SimpleGrid columns={2} spacing={5}>
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                postLink={`/posts/${post.tags.Slug.url}`}
                postImg={post.cover?.external?.url || post.cover?.file?.url}
                postTitle={post.title}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </Center>
    </>
  );
}
