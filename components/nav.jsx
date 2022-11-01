import {Box, Flex, Spacer, Link, Image} from "@chakra-ui/react";
import {useInView} from "react-intersection-observer";
import styles from "./nav.module.css";

// import Link from "next/link"; TODO ATIVAR DPS
import React from "react";

export default function Nav() {
  const navItens = [
    {name: "Works", link: "/"},
    {name: "About", link: "/"},
  ];
  const {ref, inView, entry} = useInView({
    initialInView: true,
    threshold: 0,
  });
  return (
    <Box ref={ref}>
      {inView ? (
        <Box
          className={styles.fade}
          key="block"
          py="10px"
          w="100vw"
          bgColor="#0d0d0daa"
        >
          <Flex color="white" align="center" fontSize="1.4em" mx="2vw">
            <Link href="/">
              <Image w="45" h="45" src="/logo.svg" />
            </Link>
            <Spacer />
            {navItens.map((item, idx) => (
              <Link mx="10px" px="10px" key={idx} href={item.link}>
                <Box>{item.name}</Box>
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
          w="100vw"
          zIndex={1}
        >
          <Flex color="white" fontSize="1.4em" mx="2vw">
            <Link href="/">
              <Image w="38" h="38" src="/logo.svg"></Image>
            </Link>
            <Spacer />
            {navItens.map((item, idx) => (
              <Link mx="10px" px="10px" key={idx} href={item.link}>
                <Box>{item.name}</Box>
              </Link>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}
