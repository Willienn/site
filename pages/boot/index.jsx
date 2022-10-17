import {Box, Flex, Spacer} from "@chakra-ui/react";
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
    setTimeout(() => {
      setboot(true);
    }, 2000);
  }, []);
  return (
    <>
      <Box m='10px'>
        {test.map((e, idx) => {
          return (
            boot && (
              <Box
                color="#11ff11"
                key={idx}
              >
                <Typed
                  startDelay={idx * 1800}
                  strings={e}
                  showCursor={false}
                  typeSpeed={0}
                />
              </Box>
            )
          );
        })}
      </Box>
    </>
  );
}
