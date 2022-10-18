import React from "react";
import {Client} from "@notionhq/client";
import {Heading, Box, Image, Center, Container, VStack} from "@chakra-ui/react";

export default function Posts({post, postName}) {
  console.log(post);
  return (
    // <Box>
    //   <VStack>
    //     <Image
    //       alt="Banner do Post"
    //       w="100%"
    //       h="30vh"
    //       objectFit="cover"
    //       objectPosition="center 70%"
    //       src={response[0].cover.external.url}
    //     />
    //     <Container>
    //       <Heading>{response[0].properties.Name.title[0].text.content}</Heading>
    //     </Container>
    //   </VStack>
    // </Box>
    <></>
  );
}

export async function getServerSideProps({params}) {
  let postName = params.postName;
  const notion = new Client({auth: process.env.NOTION_API_KEY});
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  const post = response.results.filter((post) => {
    return post.id.includes(postName) ? post : null;
  })[0];
  console.log(post);
  return {
    props: {
      post,
    },
  };
}
