import { useBreakpointValue } from "@chakra-ui/react";

export default function useIsMobile() {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
  });
  return isMobile;
}
