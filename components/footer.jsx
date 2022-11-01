import {Box, Flex, Image, Link, SimpleGrid, Text} from "@chakra-ui/react";
import {useInView} from "react-intersection-observer";
import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const {ref, inView, entry} = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <SimpleGrid
      ref={ref}
      columns={3}
      as="footer"
      w="100vw"
      h="15vh"
      bgColor="#0d0d0daa"
      borderTop="2px solid #090909"
      p="10px 20px"
    >
      <Text marginY="auto" fontSize=".8em">
        © Willien Muniz 2022
      </Text>
      <Box gridColumn={4} pos="relative" px="30px">
        <Flex
          h="100%"
          marginLeft="10px"
          gap="10px"
          align="center"
          className={inView ? styles.inview : styles.outview}
        >
          <Text pos="absolute" left="-28px" top="5px">
            Contato
          </Text>
          <Link href="https://www.linkedin.com/in/willien-muniz-973960255/">
            <Image src="/linkedin.svg" />
          </Link>
          <Link href="https://www.instagram.com/whatsisyourdoubt/">
            <Image src="/instagram.svg" />
          </Link>
          <Link href="/">
            <Image src="/outlook.svg" />
          </Link>
        </Flex>
      </Box>
    </SimpleGrid>
  );
}
