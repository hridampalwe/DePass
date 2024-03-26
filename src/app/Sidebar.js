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
  Button,
  Heading,
  Slide,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBookOpen,
  FiUser,
} from "react-icons/fi";
import { FaGlobe, FaCreditCard } from "react-icons/fa";
import { SitesContent, SiteAddDrawerContent } from "./SitesContent";
import { DebitContents, cardAddDrawerContent } from "./DebitContents";
import SecureNotesContent from "./SecureNotesContent";
import IdentityContent from "./IdentityContent";

const LinkItems = [
  {
    name: "Site",
    icon: FaGlobe,
    render: SitesContent,
    addContent: SiteAddDrawerContent,
  },
  {
    name: "Debit Card Info",
    icon: FaCreditCard,
    render: DebitContents,
    addContent: cardAddDrawerContent,
  },
  { name: "Secure Notes", icon: FiBookOpen, render: SecureNotesContent },
  { name: "Identity", icon: FiUser, render: IdentityContent },
  { name: "Favourites", icon: FiStar },
];

export default function SimpleSidebar({ functions }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderComponent, setRenderComponent] = useState(
    <SitesContent clickTest={clickTest} />
  );
  const [cred, setCred] = useState(null);
  const [addComponent, setAddComponent] = useState(
    <SiteAddDrawerContent functions={functions} cred={cred} />
  );
  function clickTest(credObj = { empty: true }) {
    if (credObj.empty !== true) {
      console.log(credObj);
      setCred(credObj);
    } else {
      setCred({});
    }
    // console.log(credObj);
    onOpen();
  }

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
              setRenderComponent(<link.render clickTest={clickTest} />);
              setAddComponent(
                <link.addContent functions={functions} cred={cred} />
              );
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
          p="6"
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
              fontSize="20"
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
      {/* <Button onClick={onOpen}>Open Drawer</Button> */}

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerContent
          bg={
            "radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%);"
          }
        >
          {addComponent}
        </DrawerContent>
      </Drawer>

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
