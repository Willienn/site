"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import Header from "../components/header";
import Search from "../components/search";
import Highlight from "../components/highlight";

export default function Restream() {
  return (
    <>
      <Header />
      <Search />
      <Box bgColor="#0a0a0a" h="100vh">
        <Highlight />
      </Box>
    </>
  );
}
