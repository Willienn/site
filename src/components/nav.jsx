"use client";
import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import styles from "./nav.module.css";
import Link from "next/link";

export default function Nav() {
  const navItens = [
    { name: "Works", link: "/works" },
    { name: "About", link: "/" },
  ];
  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0,
  });
  return (
    <Box ref={ref}>
      {inView ? (
        <Box
          className={styles.fade}
          key="blocks"
          py="10px"
          px={["10px", "0"]}
          w="100svw"
          bgColor="#0d0d0daa"
        >
          <Flex
            color="white"
            align="center"
            fontSize={["1.2em", "1.4em"]}
            mx="2svw"
          >
            <Link href="/">
              <Image
                w={["30", "45"]}
                h={["30", "45"]}
                src="/sitelogo.svg"
                alt="Logo do site"
              />
            </Link>
            <Spacer />
            {navItens.map((item, idx) => (
              <Link href={item.link} key={idx}>
                <Box
                  mx="10px"
                  px="10px"
                  transition="all 0.1s"
                  _hover={{ transform: "scale(1.1)" }}
                  _active={{ transform: "scale(.9)" }}
                >
                  {item.name}
                </Box>
              </Link>
            ))}
          </Flex>
        </Box>
      ) : (
        <Box
          bgColor="#00000033"
          className={styles.dash}
          key="fix"
          pos="fixed"
          py="15px"
          px={["10px", "0"]}
          w="100svw"
          zIndex={1}
        >
          <Flex color="white" fontSize={["1.2em", "1.4em"]} mx="2svw">
            <Link href="/">
              <Image
                w={["30", "38"]}
                h={["30", "38"]}
                src="/sitelogo.svg"
                alt="Logo do site"
              />
            </Link>
            <Spacer />
            {navItens.map((item, idx) => (
              <Link key={idx} fontFamily="Roboto Slab" href={item.link}>
                <Box mx="10px" px="10px" key={idx}>
                  {item.name}
                </Box>
              </Link>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}
