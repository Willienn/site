import {Box, Button, Center, Flex, Spacer, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Typed from "react-typed";

export default function Boot() {
  const [boot, setboot] = useState(false);
  const test = [
    ["Initializing Boot......"],
    ["Checking for errors"],
    ["Bios ................... OK"],
    ["Kernel ................... OK"],
    ["OS ................... OK"],
  ];
  useEffect(() => {
    setTimeout(() => {}, 2000);
  }, []);
  const [a, seta] = useState(false);
  return (
    <>
      <Center h="100vh">
        <Button w={a? '30vw':"10vw"} h={a? '30vw':"10vw"} onClick={() => seta(true)}>
          <Box
            border="3px solid #0e6b03"
            borderBlockStart={a ? "3px solid #0e6b03" : "3px solid transparent"}
            borderRadius="100%"
            w="50px"
            h="50px"
          >
            <Box
              // display={a ? "none" : "block"}
              margin="auto"
              mt={"-5px"}
              h={a ? "0px" : "20px"}
              w="2px"
              borderRadius={a ? "0" : "2px"}
              border="2px solid #0e6b03"
            ></Box>
          </Box>
        </Button>
      </Center>
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
