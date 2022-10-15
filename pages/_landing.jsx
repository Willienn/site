import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Header from "../components/header";

export default function _landing() {
  return (
    <>
      <Header />
      <Center ml="-10vw">
        <Container>
          <Box mb="10vh">
            <Heading ml="-2.5vw" fontSize="3em">
              Willien
            </Heading>
            <Text fontSize="1.2em" w="60vw">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              enim natus alias harum asperiores quas, maiores aspernatur,
              accusamus ipsa praesentium earum velit repudiandae vitae tenetur
              autem ratione ex eius obcaecati.
            </Text>
          </Box>
          <Center>
            <Heading fontSize="3em">Posts</Heading>
          </Center>
          <Flex direction="column" gap="10px">
            <HStack>
              <Box
                borderRadius="8px"
                w="400px"
                h="200px"
                bgColor="#2f2f2f"
              ></Box>
              <Spacer />
              <Box
                borderRadius="8px"
                w="400px"
                h="200px"
                bgColor="#2f2f2f"
              ></Box>
            </HStack>
            <Spacer />
            <HStack>
              <Box
                borderRadius="8px"
                w="400px"
                h="200px"
                bgColor="#2f2f2f"
              ></Box>
              <Spacer />
              <Box
                borderRadius="8px"
                w="400px"
                h="200px"
                bgColor="#2f2f2f"
              ></Box>
            </HStack>
          </Flex>
        </Container>
      </Center>
    </>
  );
}
