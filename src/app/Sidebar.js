import React, { ReactNode, useState } from "react";
import {
  Box,
  CloseButton,
  Center,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { FaGlobe, FaCreditCard } from "react-icons/fa";
import SitesContent from "./SitesContent";
import DebitContents from "./DebitContents";

const LinkItems = [
  { name: "Site", icon: FaGlobe, render: SitesContent },
  { name: "Debit Card Info", icon: FaCreditCard, render: DebitContents },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderComponent, setRenderComponent] = useState(SitesContent);

  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        // bg={useColorModeValue("white", "gray.900")}
        //   borderRight="1px"
        //   borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        //   h="full"
        {...rest}
      >
        <Center>
          <Image boxSize="200px" src="blockChain.png" />
        </Center>
        {/* <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} /> */}
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            onClick={() => {
              setRenderComponent(<link.render />);
            }}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    );
  };
  const NavItem = ({ icon, children, onClick, ...rest }) => {
    return (
      <Box
        // as="button"
        onClick={onClick}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    );
  };
  return (
    <Box height="100%" width="100%" py="30px">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}

      <Box
        borderLeft="2px"
        borderLeftColor="gray.200"
        height="100%"
        ml={{ base: 0, md: 60 }}
        p="10px"
      >
        {/* Content */}
        {renderComponent}
      </Box>
    </Box>
  );
}
