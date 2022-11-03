import "../styles/globals.css";
import {ChakraProvider} from "@chakra-ui/react";
import overrides from "../theme/index";

function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider theme={overrides}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
