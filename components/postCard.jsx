import {Box, Image, Text} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function PostCard({postLink, postImg, postTitle}) {
  return (
    <Link href={postLink}>
      <Box
        borderRadius="8px"
        w="400px"
        h="200px"
        bgColor="#2f2f2f"
        overflow="hidden"
        pos="relative"
      >
        <Image
          opacity="80%"
          alt="logo"
          w="100%"
          h="100%"
          objectFit="cover"
          src={postImg}
        />
        <Box
          w="100%"
          h="fit-content"
          bgColor="#2f2f2f88"
          _hover={{bgColor: "#2f2f2fe0"}}
          bottom="0"
          pos="absolute"
        >
          <Box m="10px">{postTitle}</Box>
        </Box>
      </Box>
    </Link>
  );
}
