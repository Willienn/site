import {Box, Image, Text} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import LazyLoad from "react-lazy-load";

export default function PostCard({postLink, postImg, postTitle}) {
  return (
    <Link href={postLink} className="link">
      <Box
        _hover={{boxShadow: "0 0 40px #4c4c4c88", transform: "scale(1.05)"}}
        borderRadius="8px"
        bgColor="#2f2f2f"
        overflow="hidden"
        pos="relative"
      >
        <LazyLoad width={400} height={200} threshold={0.1}>
          <Image
            opacity="80%"
            alt="logo"
            w="100%"
            h="100%"
            objectFit="cover"
            src={postImg}
          />
        </LazyLoad>
        <Box
          w="100%"
          h="fit-content"
          bgColor="#0d0d0d88"
          sx={{
            ".link:hover &": {
              bgColor: "#0d0d0db0",
            },
          }}
          bottom="0"
          pos="absolute"
        >
          <Box m="10px">{postTitle}</Box>
        </Box>
      </Box>
    </Link>
  );
}
