import {Box, Button, Center, Flex, Spacer, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Typed from "react-typed";
import styles from "./index.module.css";

export default function Boot() {
  const [boot, setBoot] = useState(false);
  const [button, setButton] = useState(true);
  const [bootAnimation, setBootAnimation] = useState([]);

  const test = [
    ["Initializing Boot......"],
    ["Checking for errors"],
    ["Bios ................... OK"],
    ["Kernel ................... OK"],
    ["OS ................... OK"],
  ];
  useEffect(() => {
    setTimeout(() => {
      bootAnimation.length !== 0 && setButton(false);
    },4500);
  }, [bootAnimation]);
  useEffect(() => {
    !button && setBoot(true);
  }, [button]);
  return (
    <>
      {button && (
        <Center h="100vh">
          <Button
            borderRadius="8px"
            p="10px"
            border="none"
            bgColor="#0e4f03"
            className={bootAnimation[0]}
            w="8vw"
            h="8vw"
            onClick={() =>
              setBootAnimation([
                styles.boot,
                styles.bootIcon1,
                styles.bootIcon2,
              ])
            }
          >
            <Box
              // boxShadow="0px 0px 1px white"
              className={bootAnimation[2]}
              border="3px solid #05070b"
              borderBlockStart="3px solid transparent"
              borderRadius="100%"
              w="5vw"
              h="10vh"
            >
              <Box
                className={bootAnimation[1] !== styles.bootIcon1? styles.idle : bootAnimation[1]}
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
                  startDelay={idx * 1800}
                  strings={e}
                  showCursor={false}
                  typeSpeed={0}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
}
