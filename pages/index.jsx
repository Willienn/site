import { Center, Code, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import Nav from '../components/nav'
import PostCard from '../components/postCard'
import Footer from '../components/footer'
import { getDatabase } from '../lib/notion'
import Link from 'next/link'
import Head from 'next/head'
import useIsMobile from '../hooks/isMobile'
import StructuredData from '../components/structureData'

export const databaseId = process.env.NOTION_DATABASE_ID

export default function _landing({ posts }) {
  const isMobile = useIsMobile()
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    headline: 'Daily Codes',
    description:
      'Falo sobre notícias, curiosidades e também posto coisas autorais.',
  }
  return (
    <>
      <StructuredData data={structuredData} />
      <Nav />
      <Center>
        <Flex mx="10px" direction="column" mb="10vh" mt="5vh">
          <Heading mb="5px" ml="-2.5vw" fontSize={['2em', '3em']}>
            <Link fontFamily="Fira Code" className="link" href="/about">
              Willien
            </Link>
          </Heading>
          {isMobile ? (
            <Code
              bgColor="transparent"
              color="#d0d0d0"
              whiteSpace="pre-wrap"
              fontSize={['1em', '1.4em']}
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
              fontSize={['.9em', '1.4em']}
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
          <Heading textAlign="center" fontSize={['2em', '3em']}>
            Posts
          </Heading>
          <SimpleGrid columns={2} spacing={5}>
            {posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  postLink={`/posts/${post.id}`}
                  postImg={post.cover.external.url || post.cover.file.url}
                  postTitle={post.properties.Name.title[0].text.content}
                />
              )
            })}
          </SimpleGrid>
        </Flex>
      </Center>
      <Footer />
    </>
  )
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId)
  return {
    props: {
      posts: database,
    },
    revalidate: 1000,
  }
}
