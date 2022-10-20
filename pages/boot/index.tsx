import {Box, Button, Center, Flex, Spacer, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Typed from "react-typed";
import styles from "./index.module.css";

export default function Boot() {
  const [boot, setBoot] = useState(false);
  const [button, setButton] = useState(true);

  const test = [
    ["Initializing Boot......"],
    ["Checking for errors"],
    ["Bios ................... OK"],
    ["Kernel ................... OK"],
    ["OS ................... OK"],
  ];
  useEffect(() => {
    setTimeout(() => {
      setButton(false);
    }, 2000);
  }, []);
  useEffect(() => {
    !button && setBoot(true);
  }, [button]);
  const [bootAnimation, setBootAnimation] = useState([]);
  return (
    <>
      {button && (
        <Center h="100vh">
          <Button
            border="none"
            bgColor="#0e6b03"
            className={bootAnimation[0]}
            w="10vw"
            h="10vw"
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
              border="3px solid #000"
              borderBlockStart="3px solid transparent"
              borderRadius="100%"
              w="50px"
              h="50px"
            >
              <Box
                className={bootAnimation[1]}
                margin="auto"
                mt="-5px"
                h="20px"
                w="2px"
                borderRadius="2px"
                border="2px solid #000"
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
