import {Box} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Typed from "react-typed";

export default function Boot() {
  const [boot, setboot] = useState(false);
  const test = [
    ["Booting........."],
    ["Checking for errors"],
    ["Bios ok"],
    ["SO ok"],
    ["Kernel ok"],
  ];
  const [teste, setTeste] = useState("/");
  const animation = teste;
  setTimeout(() => {
    setboot(true);
  }, 3000);
  useEffect(() => {
      teste !== "\\" ? setTeste("\\") : setTeste("/");
  },);
  return (
    <>
      <Box>{teste}{teste}{teste}{teste}{teste}{teste}{teste}</Box>
      {test.map((e, idx) => {
        return (
          boot && (
            <Box color="#11ff11" key={idx}>
              <Typed
                startDelay={idx * 600}
                strings={e}
                showCursor={false}
                typeSpeed={0}
              />
            </Box>
          )
        );
      })}
    </>
  );
}
