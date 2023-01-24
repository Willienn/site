import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import overrides from '../theme/index'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={overrides}>
      <Head>
        <title>Daily Codes</title>
        <meta
          name="description"
          content="Falo sobre notícias, curiosidades e também posto coisas autorais."
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  )
}

export default MyApp
