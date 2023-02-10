import Footer from './footer'
import Nav from './nav'
import { Box } from '@chakra-ui/react'

export default function Layout({ children }) {
  return (
    <Box minHeight={'100vh'} pos={'relative'} pb={['80px', '80px', '100px']}>
      <Nav />
      {children}
      <Footer />
    </Box>
  )
}
