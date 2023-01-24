import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import styles from './aquarium.module.css'

export default function aquarium() {
  const [a, setA] = useState(undefined)
  const [b, setB] = useState(undefined)
  setInterval(function () {
    setA(Math.floor(Math.random() * (300 - 200) + 200))
    setB(Math.floor(Math.random() * (300 - 100) + 0))
  }, 2000)
  return (
    <Box
      overflow="hidden"
      display="flex"
      justifyContent="center"
      w="100vw"
      h="100vh"
    >
      <Flex justifyContent="center" alignItems="center" pos="relative">
        <Box
          w="1500px"
          borderBottom="400px solid #16161c"
          borderLeft="400px solid #000812"
          borderRight="400px solid #000812"
          top="40%"
          zIndex="-1"
          pos="absolute"
          className={styles.table}
        ></Box>
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
              transition="all 1s"
              borderRadius="50%"
              w="50px"
              h="40px"
              pos="absolute"
              bgColor="#e07f4e"
              top={a}
              left={b}
              className={styles.fish}
              zIndex="2"
            ></Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
