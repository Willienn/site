"use client";
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
import { IoMdArrowDropright } from "react-icons/io";
import Head from "next/head";
import styles from "./page.module.css";

interface Icon {
  name: string;
  type: string;
  window: JSX.Element;
}

const BootScreen: React.FC = () => {
  const bootText = [
    ["Initializing Boot......"],
    ["Checking for errors"],
    ["Bios ................... OK"],
    ["Kernel ................... OK"],
    ["Initializing OS"],
  ];

  return (
    <Box m="10px">
      {bootText.map((text, idx) => (
        <Box color="#11ff11" key={idx}>
          <Typed
            startDelay={idx * 1600}
            strings={text}
            showCursor={false}
            typeSpeed={10}
          />
        </Box>
      ))}
    </Box>
  );
};

const IconWindow: React.FC<{ icon: Icon; onClick: () => void }> = ({
  icon,
  onClick,
}) => (
  <Button
    variant="unstyled"
    cursor="pointer"
    bgColor="transparent"
    m="2px 4px"
    onClick={onClick}
  >
    <VStack>
      <Image
        mb="-5px"
        src={
          icon.type === "computer"
            ? "/computer.png"
            : icon.type === "txt"
              ? "/text.png"
              : icon.type === "css"
                ? "/question.png"
                : icon.type === "mail"
                  ? "/mail.png"
                  : undefined
        }
      />
      <Text
        fontFamily="VT323"
        fontSize="14px"
        color="#F0F0F0"
        textShadow="1px 1px #303030ee"
      >
        {icon.name}
      </Text>
    </VStack>
  </Button>
);

export default function Boot() {
  const [state, setState] = useState({
    boot: false,
    buttonVisible: true,
    bootAnimation: [] as string[],
    loading: false,
    sysLoaded: false,
    menuOpen: false,
    openWindows: [] as JSX.Element[],
  });
  const [date, setDate] = useState(new Date());

  const icons: Icon[] = [
    { name: "Computer", type: "computer", window: <WindowContent /> },
    { name: "text.txt", type: "txt", window: <WindowContent /> },
    { name: "About.vfx", type: "css", window: <WindowContent /> },
    { name: "Contact", type: "mail", window: <WindowContent /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (state.bootAnimation.length !== 0) {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          buttonVisible: false,
          boot: true,
        }));
        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            boot: false,
            loading: true,
          }));
          setTimeout(() => {
            setState((prevState) => ({
              ...prevState,
              sysLoaded: true,
              loading: false,
            }));
          }, 5500);
        }, 7500);
      }, 4500);
    }
  }, [state.bootAnimation]);

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
      <Box h="100svh" w="100svw" overflow="hidden">
        {state.buttonVisible && (
          <Center h="97svh">
            <Button
              display="flex"
              variant="unstyled"
              borderRadius="8px"
              border="none"
              bgColor="#0e4f03"
              className={state.bootAnimation[0]}
              w="120px"
              h="120px"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  bootAnimation: [
                    styles.boot,
                    styles.bootIcon1,
                    styles.bootIcon2,
                  ],
                }))
              }
            >
              <Box
                border="3px solid #05070b"
                borderBlockStart="3px solid transparent"
                borderRadius="100%"
                w="65px"
                h="60px"
                className={state.bootAnimation[2]}
              >
                <Box
                  className={
                    state.bootAnimation[1] !== styles.bootIcon1
                      ? styles.idle
                      : state.bootAnimation[1]
                  }
                  margin="auto"
                  mt="-5px"
                  h="20px"
                  w="2px"
                  borderRadius="2px"
                  border="2px solid #05070b"
                />
              </Box>
            </Button>
          </Center>
        )}

        {state.boot && <BootScreen />}
        {state.loading && (
          <VStack h="100svh">
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

        {state.sysLoaded && (
          <Box h="100svh" w="100svw">
            <Box
              className={styles.windows}
              h="calc(100vh - 40px)"
              w="100svw"
              p="10px"
            >
              {icons.map((icon, idx) => (
                <IconWindow
                  key={idx}
                  icon={icon}
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      openWindows: prevState.openWindows.concat(icon.window),
                    }))
                  }
                />
              ))}
            </Box>

            <Flex
              p="4px"
              justify="space-between"
              alignItems="center"
              w="100svw"
              h="40px"
              bgColor="#C0C0C0"
              borderTop="3px solid #cfcfcf"
              borderLeft="3px solid #cfcfcf"
              pos="relative"
            >
              <Button
                variant="unstyled"
                borderRadius="none"
                bgColor="#C6C6C6"
                p="4px"
                h="fit-content"
                my="2px"
                ml="5px"
                borderTop="2px solid #dfdfdf"
                borderLeft="2px solid #dfdfdf"
                borderBottom="2px solid #2e2e2e"
                borderRight="2px solid #2e2e2e"
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    menuOpen: !prevState.menuOpen,
                  }))
                }
              >
                <Image src="/start-button.png" />
                {state.menuOpen && (
                  <Box
                    bgColor="#C6C6C6"
                    w="100px"
                    h="200px"
                    bottom="105%"
                    // left="5px"
                    left="-2px"
                    pos="absolute"
                    borderTop="2px solid #dfdfdf"
                    borderLeft="2px solid #dfdfdf"
                    borderBottom="2px solid #2e2e2e"
                    borderRight="2px solid #2e2e2e"
                  >
                    <Flex direction="column">
                      {["Programs", "Documents", "Contact", "Willien"].map(
                        (item, idx) => (
                          <Text
                            color="black"
                            key={idx}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            paddingX="4px"
                            _hover={{ bgColor: "#0090E4" }}
                            fontFamily="VT323"
                            cursor="pointer"
                          >
                            {item}
                            {item === "Programs" && (
                              <IoMdArrowDropright
                                style={{ fontSize: "12px" }}
                              />
                            )}
                          </Text>
                        ),
                      )}
                    </Flex>
                  </Box>
                )}
              </Button>

              <Box
                h="fit-content"
                px="4px"
                borderTop="2px solid #dfdfdf"
                borderLeft="2px solid #dfdfdf"
                borderBottom="2px solid #2e2e2e"
                borderRight="2px solid #2e2e2e"
              >
                <Text
                  userSelect="none"
                  fontFamily="VT323"
                  color="#3E3E3E"
                  fontWeight="bold"
                >
                  {date.toLocaleTimeString()}
                </Text>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
}

const WindowContent: React.FC = () => {
  return (
    <Box>
      <Text>This is a window content</Text>
    </Box>
  );
};
