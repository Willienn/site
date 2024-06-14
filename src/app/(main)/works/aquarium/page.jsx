"use client";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./page.module.css";
import useIsMobile from "../../../../hooks/isMobile";

export default function Aquarium() {
  const [a, setA] = useState(undefined);
  const [b, setB] = useState(undefined);
  setInterval(function () {
    setA(Math.floor(Math.random() * (300 - 200) + 200));
    setB(Math.floor(Math.random() * (300 - 100) + 0));
  }, 2000);
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <>Sorry this page isnt for mobile</>
      ) : (
        <Box
          overflow="hidden"
          display="flex"
          justifyContent="center"
          minW="100vw"
          minH="100vh"
          bgColor="#000812"
          zIndex={-1}
        >
          <Flex
            zIndex={1}
            justifyContent="center"
            alignItems="center"
            pos="relative"
          >
            <Box
              w="1500px"
              borderBottom="400px solid #16161c"
              borderLeft="400px solid #000812"
              borderRight="400px solid #000812"
              top="40%"
              zIndex="-1"
              pos="absolute"
              className={styles.table}
            />
            <Box
              className={styles.bowl}
              pos="relative"
              border="2px solid white"
              borderRadius="50%"
              h="400px"
              w="400px"
            >
              <Box className={styles.waves}>
                <Box
                  transition="all 1s"
                  borderRadius="50%"
                  w="50px"
                  h="40px"
                  pos="absolute"
                  bgColor="#e07f4e"
                  top={a}
                  left={b}
                  className={styles.fish}
                  zIndex="2"
                />
              </Box>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}
