import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Typed from "react-typed";
import styles from "./index.module.css";

export default function Boot() {
  const [boot, setBoot] = useState(false);
  const [button, setButton] = useState(true);
  const [bootAnimation, setBootAnimation] = useState([]);
  const [loading, setloading] = useState(false);
  const [sys, setSys] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);

  const [date, setDate] = useState(new Date());

  const test = [
    ["Initializing Boot......"],
    ["Checking for errors"],
    ["Bios ................... OK"],
    ["Kernel ................... OK"],
    ["Initializing OS loading"],
  ];

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      bootAnimation.length !== 0 && setButton(false);
    }, 4500);
  }, [bootAnimation]);

  useEffect(() => {
    !button && setBoot(true);
    setTimeout(() => {
      boot && setBoot(false);
    }, 7500);
  }, [button]);

  useEffect(() => {
    setTimeout(() => {
      boot && setBoot(false);
      setTimeout(() => {
        !boot && setloading(true);
      }, 5500);
    }, 8500);
  }, [boot]);

  useEffect(() => {
    setTimeout(() => {
      loading && setSys(true);
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }, 6000);
  }, [loading]);
  
  return (
    <Box h="100vh" w="100vw" overflow="hidden">
      {button && (
        <Center h="97vh">
          <Button
            borderRadius="8px"
            p="10px"
            border="none"
            bgColor="#0e4f03"
            className={bootAnimation[0]}
            w="120px"
            h="120px"
            onClick={() =>
              setBootAnimation([
                styles.boot,
                styles.bootIcon1,
                styles.bootIcon2,
              ])
            }
          >
            <Box
              className={bootAnimation[2]}
              border="3px solid #05070b"
              borderBlockStart="3px solid transparent"
              borderRadius="100%"
              w="65px"
              h="60px"
            >
              <Box
                className={
                  bootAnimation[1] !== styles.bootIcon1
                    ? styles.idle
                    : bootAnimation[1]
                }
                margin="auto"
                mt="-5px"
                h="20px"
                w="2px"
                borderRadius="2px"
                border="2px solid #05070b"
              ></Box>
            </Box>
          </Button>
        </Center>
      )}
      {boot && (
        <Box m="10px">
          {test.map((e, idx) => {
            return (
              <Box color="#11ff11" key={idx}>
                <Typed
                  startDelay={idx * 1600}
                  strings={e}
                  showCursor={false}
                  typeSpeed={10}
                />
              </Box>
            );
          })}
        </Box>
      )}
      {loading && (
        <VStack h="100vh">
          <Box m="auto">
            <Text textAlign="center" fontSize="1.4em" fontFamily="Fira Code">
              Windows 91
            </Text>
            <Box w="200px" h="20px" border="1px solid white" overflow="hidden">
              <Box
                className={styles.bootLoad}
                ml="2px"
                my="2px"
                w="15px"
                h="80%"
                bgColor="white"
              />
            </Box>
          </Box>
        </VStack>
      )}
      {sys && (
        <Box h="100vh" w="100vw">
          <Box className={styles.windows} h="94.5vh" w="100vw"></Box>
          <Flex
            justify="space-between"
            w="100vw"
            h="5.5vh"
            bgColor="#C0C0C0"
            borderTop="3px solid #cfcfcf"
            borderLeft="3px solid #cfcfcf"
            pos="relative"
          >
            <Button
              w="full"
              h="full"
              p="4px"
              my="2px"
              ml="5px"
              borderTop="1.5px solid #dfdfdf"
              borderLeft="1.5px solid #dfdfdf"
              onClick={() => {
                setmenuOpen(menuOpen ? false : true);
              }}
            >
              <Image src="/start-button.png" />
            </Button>
            {menuOpen && (
              <Box
                bgColor="#C6C6C6"
                w="100px"
                h="100px"
                top="-100px"
                left="5px"
                pos="absolute"
              >
                <Flex direction="column" gap="none">
                  <Button
                    border="none"
                    borderBottom="1px solid #4c4c4c"
                    w="100px"
                    m="none"
                    bgColor="transparent"
                  >
                    My computer
                  </Button>
                  <Button
                    border="none"
                    borderBottom="1px solid #4c4c4c"
                    w="100px"
                    m="none"
                    bgColor="transparent"
                  >
                    Progans
                  </Button>
                  <Button
                    border="none"
                    borderBottom="1px solid #4c4c4c"
                    w="100px"
                    m="none"
                    bgColor="transparent"
                  >
                    Documents
                  </Button>
                  <Button
                    border="none"
                    borderBottom="1px solid #4c4c4c"
                    w="100px"
                    m="none"
                    bgColor="transparent"
                  >
                    Willien
                  </Button>
                </Flex>
              </Box>
            )}
            <Button
              w="50px"
              h="full"
              p="4px"
              my="2px"
              mr="5px"
              border="none"
              boxShadow="inset 0 0 2px 1px #4c4c4c"
            >
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
