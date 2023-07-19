import { Box, Flex, Image, Link, SimpleGrid, Text } from "@CS-chakra";
import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <SimpleGrid
      position={"absolute"}
      bottom={0}
      columns={[2, 3]}
      as="footer"
      w="100vw"
      h={["80px", "80px", "100px"]}
      bgColor="#0d0d0daa"
      borderTop="2px solid #090909"
      p="10px 20px"
    >
      <Text marginY="auto" fontSize={[".8em", ".9em", ".9em"]}>
        © Willien Muniz 2022
      </Text>
      <Box gridColumn={4} pos="relative" px={["0px", "0px", "30px"]}>
        <Flex
          h="100%"
          marginLeft={["10px", "20px", "0px"]}
          gap={["10px", "10px", "20px"]}
          align="center"
          className={styles.inview}
        >
          <Text
            pos="absolute"
            left={["-46px", "-46px", "-49px"]}
            fontSize={[".9em", ".95em", "1em"]}
            top={["19px", "19px", "26px"]}
          >
            Contato
          </Text>
          <Link href="https://www.linkedin.com/in/willien-muniz-973960255/">
            <Image src="/linkedin.svg" alt="Link para meu Linkedin" />
          </Link>
          <Link href="https://www.instagram.com/whatsisyourdoubt/">
            <Image src="/instagram.svg" alt="Link para meu Instagram" />
          </Link>
          {/*<Link href="/">*/}
          {/*  <Image src="/outlook.svg" alt="Link para meu Email"/>*/}
          {/*</Link>*/}
        </Flex>
      </Box>
    </SimpleGrid>
  );
}
