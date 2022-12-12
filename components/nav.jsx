import { Box, Flex, Image, Link, Spacer } from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import styles from './nav.module.css'

// import Link from "next/link"; TODO ATIVAR DPS
import React from 'react'

export default function Nav() {
  const navItens = [
    { name: 'Works', link: '/' },
    { name: 'About', link: '/' },
  ]
  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0,
  })
  return (
    <Box ref={ref}>
      {inView ? (
        <Box
          className={styles.fade}
          key="block"
          py="10px"
          px={['10px', '0']}
          w="100vw"
          bgColor="#0d0d0daa"
        >
          <Flex
            color="white"
            align="center"
            fontSize={['1.2em', '1.4em']}
            mx="2vw"
          >
            <Link href="/">
              <Image
                w={['30', '45']}
                h={['30', '45']}
                src="/sitelogo.svg"
                alt="Logo do site"
              />
            </Link>
            <Spacer />
            {navItens.map((item, idx) => (
              <Link mx="10px" px="10px" key={idx} href={item.link}>
                <Box>{item.name}</Box>
              </Link>
            ))}
          </Flex>
        </Box>
      ) : (
        <Box
          bgColor="#00000033"
          className={styles.dash}
          key="fix"
          pos="fixed"
          py="15px"
          px={['10px', '0']}
          w="100vw"
          zIndex={1}
        >
          <Flex color="white" fontSize={['1.2em', '1.4em']} mx="2vw">
            <Link href="/">
              <Image
                w={['30', '38']}
                h={['30', '38']}
                src="/sitelogo.svg"
                alt="Logo do site"
              />
            </Link>
            <Spacer />
            {navItens.map((item, idx) => (
              <Link mx="10px" px="10px" key={idx} href={item.link}>
                <Box fontFamily="Roboto Slab">{item.name}</Box>
              </Link>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  )
}
