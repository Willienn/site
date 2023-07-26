"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import overrides from "@/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={overrides}>{children}</ChakraProvider>;
}
