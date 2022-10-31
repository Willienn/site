import {Box, Flex, Spacer, Link} from "@chakra-ui/react";
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
  console.log(inView);
  return (
    <Box ref={ref}>
      {inView ? (
        <Box key="block" py="15px" w="100vw">
          <Flex color="white" fontSize="1.4em" mx="2vw">
            <Link href="/">
              <Box fontSize="1.5em">LOGO</Box>
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
          className={styles.dash}
          key="fix"
          pos="fixed"
          py="15px"
          w="100vw"
          zIndex={1}
        >
          <Flex color="white" fontSize="1.4em" mx="2vw">
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
