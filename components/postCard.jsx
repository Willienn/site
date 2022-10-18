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
      >
        <Image
          opacity="80%"
          alt="logo"
          w="100%"
          h="75%"
          objectFit="cover"
          src={postImg}
        />
        <Text px="25px">{postTitle}</Text>
      </Box>
    </Link>
  );
}
