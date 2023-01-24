import { Box } from '@chakra-ui/react'
import React from 'react'
import Header from './components/header'
import Highlight from './components/highlight'
import Search from './components/search'

export default function restream() {
  return (
    <>
      <Header />
      <Search />
      <Box bgColor="#0a0a0a" h="100vh">
        <Highlight />
      </Box>
    </>
  )
}
