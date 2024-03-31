import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaCreditCard,
  FaFilePen,
  FaGlobe,
  FaHeart,
  FaIdCard,
  FaMoon,
  FaPassport,
  FaSun,
} from "react-icons/fa6";
import { useEffect, useState } from "react";

import AccDetails from "./Info";
import CardsContents from "./CardsContents";
import IdentityContent from "./IdentityContent";
import LoadingScreen from "./LoadingScreen";
import SecureNotesContent from "./SecureNotesContent";
import SitesContent from "./SitesContent";
import getColorValues from "./colorValues";

const LinkItems = [
  { name: "Sites", icon: FaGlobe, render: SitesContent },
  { name: "Cards", icon: FaCreditCard, render: CardsContents },
  { name: "Notes", icon: FaFilePen, render: SecureNotesContent },
  { name: "Identities", icon: FaPassport, render: IdentityContent },
  { name: "Info", icon: FaHeart, render: AccDetails },
];

export default function SimpleSidebar({ functions }) {
  const [obj, setObj] = useState({
    Sites: null,
    Cards: null,
    Notes: null,
    Identities: null,
    Info: [{}],
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const colorValues = getColorValues();
  const [componentType, setComponentType] = useState("Sites");
  const [credentialsArr, setCredentialsArr] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [renderComponent, setRenderComponent] = useState(
    <SitesContent functions={functions} credArr={obj[componentType]} />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorModeButton = useColorModeValue(FaMoon, FaSun);
  functions.getSitesCredentials = getSitesCredentials;

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
    if (obj[componentType] === null) {
      getSitesCredentials(componentType);
    }
  }, [obj[componentType]?.length]);

  async function getSitesCredentials(compType) {
    const recv = await functions.getCredentials(compType);
    // console.log(recv);
    setObj((prevState) => ({ ...prevState, [compType]: recv }));
    setIsEdited(true);
    // console.log(compType);
    // console.log(isEdited);
    // setRenderComponent(
    //   <SitesContent functions={functions} credArr={obj[componentType]} />
    // );
  }

  useEffect(() => {
    // console.log(credentialsArr);
    if (isEdited === true) {
      if (componentType === "Sites") {
        setRenderComponent(
          <SitesContent functions={functions} credArr={obj[componentType]} />
        );
      } else if (componentType === "Cards") {
        setRenderComponent(
          <CardsContents functions={functions} credArr={obj[componentType]} />
        );
      } else if (componentType === "Notes") {
        // console.log(obj);
        setRenderComponent(
          <SecureNotesContent
            functions={functions}
            credArr={obj[componentType]}
          />
        );
      } else if (componentType === "Identities") {
        setRenderComponent(
          <IdentityContent functions={functions} credArr={obj[componentType]} />
        );
      }
    }
    setIsEdited(false);
  }, [isEdited]);

  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box w={{ base: "full", md: 60 }} pos="fixed" {...rest}>
        <Center py="5px">
          <Image boxSize="200px" src={colorValues.dePass_logo} />
        </Center>
        {/* <Divider /> */}
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            onClick={() => {
              setComponentType(link.name);
              setRenderComponent(
                <link.render functions={functions} credArr={obj[link.name]} />
              );
            }}
          >
            {link.name}
          </NavItem>
        ))}
        <NavItem
          key="colorMode"
          icon={colorModeButton}
          onClick={toggleColorMode}
        >
          Color Mode
        </NavItem>
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
            bg: "blackAlpha.200",
            // color: colorValues.black,
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="26"
              _groupHover={{
                // color: "gray.700",
                color: colorValues.black,
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
        borderLeftColor={colorValues.dividerColor}
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
