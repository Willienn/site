import {Box, Flex, Spacer, Link} from "@chakra-ui/react";
// import Link from "next/link"; TODO ATIVAR DPS
import React from "react";

export default function Nav() {
  const navItens = [
    {name: "Works", link: "/"},
    {name: "About", link: "/"},
  ];
  return (
    <Box py="15px" w="100vw">
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
  );
}
