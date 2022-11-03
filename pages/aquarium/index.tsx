import {Box, Center} from "@chakra-ui/react";
import {useState} from "react";
import styles from "./index.module.css";

export default function index() {
  const [a, setA] = useState(undefined);
  const [b, setB] = useState(undefined);
  setInterval(function () {
    setA(Math.floor(Math.random() * (300 - 200) + 200));
    setB(Math.floor(Math.random() * (300 - 100) + 0));
  }, 2000);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100vw"
      h="100vh"
    >
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
          transition='all 1s'
          borderRadius='50%'
            w="50px"
            h="40px"
            pos="absolute"
            bgColor="orange"
            top={a}
            left={b}
            className={styles.fish}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
}
