import { Box, Flex, Grid, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

export default function Highlight() {
  return (
    <SimpleGrid
      columns={2}
      w="80vw"
      bgColor="#111"
      mx="auto"
      borderRadius="10px"
    >
      <Image
        src="/cape.webp"
        boxShadow="0px 0px 10px 2px black"
        _hover={{
          boxShadow: "0px 0px 40px 2px #a7a7a733",
        }}
        zIndex={1}
        borderRadius="10px"
      />
      <Grid w="fit-content" h="90%">
        <Text my="auto" fontSize="1.5em" pl="10px">
          Deep Rock Galactic
        </Text>
        <Box>
          <Flex gap="10px" mb="10px">
            <Image w="180px" h="80%" src="/mini1.webp" />
            <Image w="180px" h="80%" src="/mini2.webp" />
          </Flex>
          <Flex gap="10px">
            <Image w="180px" h="80%" src="/mini3.webp" />
            <Image w="180px" h="80%" src="/mini4.webp" />
          </Flex>
        </Box>
      </Grid>
    </SimpleGrid>
  );
}
