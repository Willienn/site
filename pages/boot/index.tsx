import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
  chakra,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import React, {useEffect, useMemo, useState} from "react";
import Typed from "react-typed";
import styles from "./index.module.css";
import {IoMdArrowDropright} from "react-icons/io";
import {type} from "os";

export default function Boot() {
  const [boot, setBoot] = useState(false);
  const [button, setButton] = useState(true);
  const [bootAnimation, setBootAnimation] = useState([]);
  const [loading, setloading] = useState(false);
  const [sys, setSys] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);

  const [date, setDate] = useState(new Date());

  const bootText = [
    ["Initializing Boot......"],
    ["Checking for errors"],
    ["Bios ................... OK"],
    ["Kernel ................... OK"],
    ["Initializing OS"],
  ];

  const icons: {name: string; type: string}[] = [
    {name: "Computer", type: "computer"},
    {name: "text.txt", type: "txt"},
    {name: "About.vfx", type: "css"},
    {name: "Contact", type: "mail"},
  ];

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    bootAnimation.length !== 0 &&
      setTimeout(() => {
        setButton(false);
        setBoot(true);
        setTimeout(() => {
          setBoot(false);
          setTimeout(() => {
            setloading(true);
            setTimeout(() => {
              setSys(true);
              setloading(false);
            }, 5500);
          }, 500);
        }, 7500);
      }, 4500);
  }, [bootAnimation]);

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
          {bootText.map((e, idx) => {
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
          <Box className={styles.windows} h="94.5vh" w="100vw" p="10px">
            {icons.map(({name, type}, idx) => (
              <Button
                cursor="pointer"
                bgColor="transparent"
                border="none"
                m="2px"
                key={idx}
                onClick={() => {}}
              >
                <VStack>
                  <Image
                    mb="-5px"
                    src={
                      type === "computer"
                        ? "/computer.png"
                        : type === "txt"
                        ? "/text.png"
                        : type === "css"
                        ? "/question.png"
                        : type === "mail"
                        ? "/mail.png"
                        : null
                    }
                  />
                  <Text fontSize="12px" color="#F0F0F0">
                    {name}
                  </Text>
                </VStack>
              </Button>
            ))}
          </Box>
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
              bgColor="#C6C6C6"
              w="full"
              h="full"
              p="4px"
              my="2px"
              ml="5px"
              borderTop="2px solid #dfdfdf"
              borderLeft="2px solid #dfdfdf"
              borderBottom="2px solid #2e2e2e"
              borderRight="2px solid #2e2e2e"
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
                borderTop="2px solid #dfdfdf"
                borderLeft="2px solid #dfdfdf"
                borderBottom="2px solid #2e2e2e"
                borderRight="2px solid #2e2e2e"
              >
                <Flex fontSize="0px" direction="column" gap="none">
                  <Text
                    _hover={{bgColor: "#0090E4"}}
                    as="span"
                    w="full"
                    bgColor="transparent"
                  >
                    <Button border="none" fontSize="12px" bgColor="transparent">
                      Progams
                      <Box pos="absolute" right="-42px" top="2px">
                        <IoMdArrowDropright />
                      </Box>
                    </Button>
                  </Text>
                  <Text
                    _hover={{bgColor: "#0090E4"}}
                    as="span"
                    textAlign="left"
                    w="full"
                  >
                    <Button border="none" fontSize="12px" bgColor="transparent">
                      Documents
                      <Box pos="absolute" right="-29px" top="2px">
                        <IoMdArrowDropright />
                      </Box>
                    </Button>
                  </Text>
                  <Text
                    _hover={{bgColor: "#0090E4"}}
                    as="span"
                    w="full"
                    bgColor="transparent"
                  >
                    <Button border="none" fontSize="12px" bgColor="transparent">
                      Contact
                    </Button>
                  </Text>
                  <Text
                    _hover={{bgColor: "#0090E4"}}
                    as="span"
                    w="full"
                    bgColor="transparent"
                  >
                    <Button border="none" fontSize="12px" bgColor="transparent">
                      Willien
                    </Button>
                  </Text>
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