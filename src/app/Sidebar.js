import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCreditCard, FaGlobe } from "react-icons/fa";
import { FiBookOpen, FiInfo, FiUser } from "react-icons/fi";
import React, { useEffect, useState } from "react";

import AccDetails from "./Info";
import CardsContents from "./CardsContents";
import IdentityContent from "./IdentityContent";
import LoadingScreen from "./LoadingScreen";
import SecureNotesContent from "./SecureNotesContent";
import SitesContent from "./SitesContent";

const LinkItems = [
  { name: "Sites", icon: FaGlobe, render: SitesContent },
  { name: "Cards", icon: FaCreditCard, render: CardsContents },
  { name: "Secure Notes", icon: FiBookOpen, render: SecureNotesContent },
  { name: "Identities", icon: FiUser, render: IdentityContent },
  { name: "Info", icon: FiInfo, render: AccDetails },
];

export default function SimpleSidebar({ functions }) {
  functions.getCredentialsThroughSidebar = getSitesCredentials;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentialsArr, setCredentialsArr] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [renderComponent, setRenderComponent] = useState(<LoadingScreen />);

  // 1. stateVariable OBJ = { site :[] , card : [] , notes : [] , identities: []}
  // 2. <SitesContent credentialsArr={credentialsArr} />  =>  < ... redentialsArr={OBJ.type} />
  // 3. getSitesCredentials() => getSitesCredentials("type")
  // 4. setCredentialsArr(recv) => setOBJ({...OBJ , type : [...recv]});
  // 5. const [currentComponent, setCurrentComponent] = useState(SitesContent);
  // 6. const [componentType, setComponentType] = useState("Sites");
  // 7. setRenderComponent( <SitesContent ... /> ==> <currentComponent credentialsArr = OBJ[componentType]/>
  // 8. first UseEffect  [credentialsArr.length]); => [OBJ[componentType].length]
  // 9. getSitesCredentials() => getSitesCredentials("componentType")
  // 10. When mapping the nav items add the setVariable for componentType and currentComponent

  useEffect(() => {
    if (credentialsArr.length == 0) {
      getSitesCredentials();
    }
  }, [credentialsArr.length]);

  async function getSitesCredentials() {
    // setLoading(true);
    const recv = await functions.getCredentials("Sites");
    setIsEdited(true);
    setCredentialsArr(recv);
    // setLoading(false);
  }

  useEffect(() => {
    console.log(credentialsArr);
    if (isEdited == true) {
      setRenderComponent(
        <SitesContent functions={functions} credentialsArr={credentialsArr} />
      );
    }
    setIsEdited(false);
  }, [isEdited]);

  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box w={{ base: "full", md: 60 }} pos="fixed" {...rest}>
        <Center py="5px">
          <Image boxSize="200px" src="blockChain.png" />
        </Center>
        {/* <Divider /> */}
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            onClick={() => {
              setRenderComponent(
                <link.render
                  functions={functions}
                  credentialsArr={credentialsArr}
                />
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
        onClick={onClick}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          me="5px"
          rounded="5px"
          fontSize="18"
          fontWeight="400"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "blackAlpha.300",
            color: "black",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="26"
              _groupHover={{
                color: "black",
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
    <Box height="100%" width="100%" py="15px">
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
