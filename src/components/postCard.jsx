"use client";
import { Box, Image } from "@CS-chakra";
import Link from "next/link";
import React from "react";
import LazyLoad from "react-lazy-load";

export default function PostCard({ postLink, postImg, postTitle }) {
  return (
    <Link href={postLink}>
      <Box
        _hover={{ boxShadow: "0 0 40px #4c4c4c88", transform: "scale(1.05)" }}
        className="cardLink"
        borderRadius="8px"
        bgColor="#2f2f2f"
        overflow="hidden"
        pos="relative"
        w={["150px", "250px", "400px"]}
        h={["100px", "120px", "200px"]}
      >
        <LazyLoad width="100%" height="100%" threshold={0.1}>
          <Image
            opacity="80%"
            alt={"logo do post: " + postTitle}
            w="100%"
            h="100%"
            objectFit="cover"
            src={postImg}
          />
        </LazyLoad>
        <Box
          w="100%"
          h={["30px", "fit-content"]}
          bgColor={["#0d0d0db0", "#0d0d0db0", "#0d0d0d88"]}
          sx={{
            ".cardLink:hover &": {
              bgColor: "#0d0d0db0",
            },
          }}
          bottom="0"
          pos="absolute"
        >
          <Box
            my={["5px", "5px", "10px"]}
            mx={["5px", "10px", "10px"]}
            textAlign={["center", "left", "left"]}
            fontSize={[".8em", ".9em", "1em"]}
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {postTitle}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
