import { Box, useColorModeValue } from "@chakra-ui/react";

import SimpleSidebar from "./Sidebar";

export default function Dashboard({ functions }) {
  const bgGradientMainUI = useColorModeValue(
    "radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%);",
    "radial-gradient(328px at 2.9% 15%, rgb(45, 47, 48) 0%, rgb(33, 34, 35) 25.8%, rgb(36, 16, 33) 50.8%, rgb(30, 50, 50) 77.6%, rgb(28, 44, 36) 100.7%)"
  );
  return (
    <Box width={"100vw"} height={"100vh"} p={"20px"}>
      <Box
        rounded={"10px"}
        p={"10px"}
        bg={bgGradientMainUI}
        height={"100%"}
        boxShadow="dark-lg"
        overflow="hidden"
      >
        <SimpleSidebar functions={functions} />
      </Box>
    </Box>
  );
}
