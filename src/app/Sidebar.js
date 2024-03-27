import React, { ReactNode, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Icon,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { FiStar, FiBookOpen, FiUser } from "react-icons/fi";
import { FaGlobe, FaCreditCard } from "react-icons/fa";
import SitesContent from "./SitesContent";
import CardsContents from "./CardsContents";
import SecureNotesContent from "./SecureNotesContent";
import IdentityContent from "./IdentityContent";

const LinkItems = [
  {
    name: "Sites",
    icon: FaGlobe,
    render: SitesContent,
  },
  {
    name: "Cards",
    icon: FaCreditCard,
    render: CardsContents,
  },
  { name: "Secure Notes", icon: FiBookOpen, render: SecureNotesContent },
  { name: "Identities", icon: FiUser, render: IdentityContent },
  { name: "Favourites", icon: FiStar },
];

export default function SimpleSidebar({ functions }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderComponent, setRenderComponent] = useState(
    <SitesContent functions={functions} />
  );
  const [cred, setCred] = useState(null);

  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box w={{ base: "full", md: 60 }} pos="fixed" {...rest}>
        <Center>
          <Image boxSize="200px" src="blockChain.png" />
        </Center>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            onClick={() => {
              setRenderComponent(<link.render functions={functions} />);
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

      <Box
        borderLeft="2px"
        borderLeftColor="gray.200"
        height="100%"
        ml={{ base: 0, md: 60 }}
        p="10px"
        overflow="auto"
      >
        {renderComponent}
      </Box>
    </Box>
  );
}
