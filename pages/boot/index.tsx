import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Typed from "react-typed";
import styles from "./index.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import Head from "next/head";

export default function Boot() {
  const [boot, setBoot] = useState(false);
  const [button, setButton] = useState(true);
  const [bootAnimation, setBootAnimation] = useState([]);
  const [loading, setloading] = useState(false);
  const [sys, setSys] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);
  const [openWindow, setOpenWindow] = useState([]);
  const [date, setDate] = useState(new Date());

  const bootText = [
    ["Initializing Boot......"],
    ["Checking for errors"],
    ["Bios ................... OK"],
    ["Kernel ................... OK"],
    ["Initializing OS"],
  ];

  const icons: { name: string; type: string; window: any }[] = [
    {
      name: "Computer",
      type: "computer",
      window: (
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "#C0C0C0",
            borderTop: "2px solid #dfdfdf",
            borderLeft: "2px solid #dfdfdf",
            borderBottom: "2px solid #2e2e2e",
            borderRight: "2px solid #2e2e2e",
          }}
        >
          {" "}
        </div>
      ),
    },
    {
      name: "text.txt",
      type: "txt",
      window: (
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "#C0C0C0",
            borderTop: "2px solid #dfdfdf",
            borderLeft: "2px solid #dfdfdf",
            borderBottom: "2px solid #2e2e2e",
            borderRight: "2px solid #2e2e2e",
          }}
        >
          {" "}
        </div>
      ),
    },
    {
      name: "About.vfx",
      type: "css",
      window: (
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "#C0C0C0",
            borderTop: "2px solid #dfdfdf",
            borderLeft: "2px solid #dfdfdf",
            borderBottom: "2px solid #2e2e2e",
            borderRight: "2px solid #2e2e2e",
          }}
        >
          {" "}
        </div>
      ),
    },
    {
      name: "Contact",
      type: "mail",
      window: (
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "#C0C0C0",
            borderTop: "2px solid #dfdfdf",
            borderLeft: "2px solid #dfdfdf",
            borderBottom: "2px solid #2e2e2e",
            borderRight: "2px solid #2e2e2e",
          }}
        >
          {" "}
        </div>
      ),
    },
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
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box className="cursor" h="100vh" w="100vw" overflow="hidden">
        {button && (
          <Center h="97vh">
            <Button
              display="flex"
              variant="unstyled"
              borderRadius="8px"
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
              <Box
                w="200px"
                h="20px"
                border="1px solid white"
                overflow="hidden"
              >
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
              {icons.map(({ name, type, window }, idx) => {
                return (
                  <>
                    <Button
                      variant="unstyled"
                      cursor="pointer"
                      bgColor="transparent"
                      border="none"
                      m="2px 4px"
                      key={idx}
                      onClick={() => {
                        setOpenWindow(openWindow.concat(window));
                      }}
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
                        <Text
                          fontFamily="VT323"
                          fontSize="14px"
                          color="#F0F0F0"
                          textShadow="1px 1px #303030ee"
                        >
                          {name}
                        </Text>
                      </VStack>
                    </Button>
                  </>
                );
              })}
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
                variant="unstyled"
                borderRadius="none"
                bgColor="#C6C6C6"
                w="fit-content"
                h="fit-content"
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
                      _hover={{ bgColor: "#0090E4" }}
                      as="span"
                      w="full"
                      bgColor="transparent"
                    >
                      <Button
                        variant="unstyled"
                        fontFamily="VT323"
                        border="none"
                        fontSize="14px"
                        bgColor="transparent"
                      >
                        Progams
                        <Box pos="absolute" right="-42px" top="2px">
                          <IoMdArrowDropright />
                        </Box>
                      </Button>
                    </Text>
                    <Text
                      _hover={{ bgColor: "#0090E4" }}
                      as="span"
                      textAlign="left"
                      w="full"
                    >
                      <Button
                        variant="unstyled"
                        fontFamily="VT323"
                        border="none"
                        fontSize="14px"
                        bgColor="transparent"
                      >
                        Documents
                        <Box pos="absolute" right="-29px" top="2px">
                          <IoMdArrowDropright />
                        </Box>
                      </Button>
                    </Text>
                    <Text
                      _hover={{ bgColor: "#0090E4" }}
                      as="span"
                      w="full"
                      bgColor="transparent"
                    >
                      <Button
                        variant="unstyled"
                        fontFamily="VT323"
                        border="none"
                        fontSize="14px"
                        bgColor="transparent"
                      >
                        Contact
                      </Button>
                    </Text>
                    <Text
                      _hover={{ bgColor: "#0090E4" }}
                      as="span"
                      w="full"
                      bgColor="transparent"
                    >
                      <Button
                        variant="unstyled"
                        fontFamily="VT323"
                        border="none"
                        fontSize="14px"
                        bgColor="transparent"
                      >
                        Willien
                      </Button>
                    </Text>
                  </Flex>
                </Box>
              )}
              <Button
                borderRadius="none"
                variant="unstyled"
                w="50px"
                color="#0d0d0d"
                h="fit-content"
                fontSize=".8em"
                p="2px"
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
    </>
  );
}
