import {Box, Flex, Spacer, Link} from "@chakra-ui/react";
// import Link from "next/link"; TODO ATIVAR DPS
import React from "react";

export default function Header() {
  const headerItens = [
    {name: "Works", link: "#"},
    {name: "About", link: "#"},
  ];
  return (
    <Box py="20px" w="100vw">
      <Flex color="white" fontSize="1.4em" mx="2vw">
        <Link href="/">
          <Box fontSize="1.5em">LOGO</Box>
        </Link>
        <Spacer />
        {headerItens.map((item, {idx}) => (
          <Link mx="10px" px="10px" key={idx} href={item.link}>
            <Box>{item.name}</Box>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}
