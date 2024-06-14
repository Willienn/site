import { Box, Flex, Image, Link, SimpleGrid, Text } from "@CS-chakra";
import React from "react";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <SimpleGrid
      position={"absolute"}
      bottom={0}
      columns={[2, 3]}
      as="footer"
      w="100svw"
      h={["80px", "80px", "100px"]}
      bgColor="#0d0d0daa"
      borderTop="2px solid #090909"
      p="10px 20px"
    >
      <Text marginY="auto" fontSize={[".8em", ".9em", ".9em"]}>
        © Willien Muniz {date}
      </Text>
      <Box gridColumn={4} pos="relative" px={["0px", "0px", "30px"]}>
        <Flex
          h="100%"
          marginLeft={["10px", "20px", "0px"]}
          gap={["10px", "10px", "20px"]}
          align="center"
        >
          <Text
            pos="absolute"
            left={["-46px", "-46px", "-49px"]}
            fontSize={[".9em", ".95em", "1em"]}
            top={["19px", "19px", "26px"]}
          >
            Contact
          </Text>
          <Link href="https://www.linkedin.com/in/willien-muniz-973960255/">
            <Image src="/linkedin.svg" alt="Link for my Linkedin" />
          </Link>
          <Link href="https://www.instagram.com/whatsisyourdoubt/">
            <Image src="/instagram.svg" alt="Link for my Instagram" />
          </Link>
        </Flex>
      </Box>
    </SimpleGrid>
  );
}
