"use client";
import { Heading } from "@CS-chakra";
import { Flex, Text, VStack } from "@chakra-ui/react";

export default function () {
  return (
    <Flex
      m="auto"
      direction="column"
      alignItems="center"
      minW="100%"
      minH="83svh"
    >
      <VStack h="100%" m="auto">
        <Heading>Work in Progress</Heading>
        <Text>Changing to Nextjs.13 app router</Text>
        <Text fontSize={["0.9rem", "1rem"]}>
          I haven't had time lately bc is not a quick thing to do
        </Text>
      </VStack>
    </Flex>
  );
}
