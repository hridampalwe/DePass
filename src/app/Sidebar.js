import React, { ReactNode, useState } from "react";
import {
  Box,
  CloseButton,
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
import Dashboard from "./Dashboard";
import Debitinfo from "./Debitinfo";

const LinkItems = [
  { name: "Site", icon: FaGlobe, render: Dashboard },
  { name: "Debit Card Info", icon: FaCreditCard, render: Debitinfo },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export default function SimpleSidebar({ toggleDashboard, isDashboardVisible }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderComponent, setRenderComponent] = useState(null);
  const [debitInfoOpen, setDebitInfoOpen] = useState(false);

  const handleLinkClick = async (renderFunction) => {
    console.log("Clicked link:", renderFunction);
    if (renderFunction === Debitinfo) {
      console.log("Rendering Debitinfo");
      if (debitInfoOpen) {
        setDebitInfoOpen(false);
        setRenderComponent(null);
        toggleDashboard();
      } else {
        setRenderComponent(<Debitinfo />);
        setDebitInfoOpen(true);
      }
    } else if (renderFunction === Dashboard) {
      if (debitInfoOpen) {
        setDebitInfoOpen(false);
        setRenderComponent(null);
        toggleDashboard();
      } else {
        toggleDashboard();
        setRenderComponent(null);
      }
    } else {
      setRenderComponent(null);
      setDebitInfoOpen(false);
    }
    onClose();
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        handleLinkClick={handleLinkClick}
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
          <SidebarContent onClose={onClose} handleLinkClick={handleLinkClick} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}

      <Box ml={{ base: 0, md: 60 }} p="0">
        {/* Content */}
        {renderComponent}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, handleLinkClick, ...rest }) => {
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
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        mt="4"
        mb="10"
        justifyContent="space-between"
      >
        <Image src="blockChain.png" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => handleLinkClick(link.render)}
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
      as="button"
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
