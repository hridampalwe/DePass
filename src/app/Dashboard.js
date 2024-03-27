import SimpleSidebar from "./Sidebar";
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function Dashboard({ functions }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box width={"100vw"} height={"100vh"} p={"20px"}>
      <Box
        rounded={"10px"}
        p={"10px"}
        bg={
          "radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%);"
        }
        height={"100%"}
        boxShadow="dark-lg"
        overflow="hidden"
      >
        <SimpleSidebar functions={functions} />
      </Box>
    </Box>
  );
}
