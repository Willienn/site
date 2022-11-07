import {extendTheme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";
import type {StyleFunctionProps} from "@chakra-ui/styled-system";

const overrides = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      "*": {
        transition: "all 0.3s",
        fontFamily: "Roboto Slab",
        boxSizing: "border-box",
      },
      body: {
        color: "#d0d0d0",
        bg: "#101015",
      },
      a: {
        textDecoration: "none",
        color: "inherit",
      },
    }),
  },
});

export default overrides;
