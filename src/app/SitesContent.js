import { Input as AInput, Popconfirm } from "antd";
import { useState } from "react";
import {
  Heading,
  Button,
  HStack,
  Box,
  InputGroup,
  InputRightElement,
  Divider,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Text,
  Slide,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  FormControl,
  FormHelperText,
  FormLabel,
  DrawerHeader,
  VStack,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import {
  EditIcon,
  Search2Icon,
  DeleteIcon,
  RepeatIcon,
  AddIcon,
  ArrowForwardIcon,
  CheckIcon,
} from "@chakra-ui/icons";

const credentialsArr = [
  {
    id: 1,
    url: "pakode.com",
    site: "pakode",
    username: "pakdoea",
    password: "Blahhhh",
  },
  {
    id: 2,
    url: "lasn.com",
    site: "lasn",
    username: "pakdoea",
    password: "Blahhhh",
  },
  {
    id: 3,
    url: "yoyo.com",
    site: "yoyo",
    username: "pakdoea",
    password: "Blahhhh",
  },
  {
    id: 4,
    url: "sakshi.com",
    site: "sakshi",
    username: "gay",
    password: "Blahhhh",
  },
];

export default function SitesContent () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
  const [credential, setCredential] = useState(null);
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  function testClick(credObj = { empty: true }) {
    if (credObj.empty !== true) {
      setCredential(credObj);
    } else {
      setCredential(null);
    }
    onOpen();
  }

  function SiteAddDrawerContent() {
    return (
      <Box width="100%" height="100%" padding="20px">
        <VStack width="100%" alignItems="left">
          <Heading pt="10px" pl="5px" size="xl">
            Details
          </Heading>
          <Divider borderColor="gray.200" />
          <Box bg="gray.100" rounded="10px" p="20px">
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Site Name
            </Text>
            <Input
              type="text"
              name="site"
              placeholder="Enter the Site Name"
              value={credentials? credentials.site:''}
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Site URL
            </Text>
            <Input size="lg" placeholder="Enter the Site URL" />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Username
            </Text>
            <Input size="lg" placeholder="Enter the Username" />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Password
            </Text>
            <Input size="lg" placeholder="Enter the Password" />
            <Center pt="20px">
              <Button colorScheme="blue" leftIcon={<CheckIcon />}>
                Save Credentials
              </Button>
            </Center>
          </Box>
        </VStack>
      </Box>
    );
  }
  return (
    <Box width={"95%"} px="10px" height={"100%"}>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerContent
          bg={
            "radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%);"
          }
        >
          <SiteAddDrawerContent />
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Sites</Heading>
      <Divider borderWidth="1px" borderColor="gray.200" />
      <HStack
        marginTop="20px"
        p="3px"
        spacing="5px"
        rounded="10px"
        bg="gray.200"
        marginBottom="10px"
      >
        <InputGroup size="lg">
          <Input size="lg" placeholder="Search sites" />
          <InputRightElement width="120px">
            <Button rightIcon={<Search2Icon />}>Search</Button>
          </InputRightElement>
        </InputGroup>
        <Button
          rightIcon={<AddIcon />}
          colorScheme={"gray"}
          variant="solid"
          onClick={() => {
            testClick();
          }}
        >
          Add Site
        </Button>
        <Button rightIcon={<RepeatIcon />} colorScheme={"gray"} variant="solid">
          Refresh
        </Button>
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme={"red"}
          variant="outline"
        >
          Logout
        </Button>
      </HStack>
      <Box rounded="10px" bg="gray.200">
        <Accordion rounded="10px" allowToggle>
          {credentialsArr.map((cred) => (
            <AccordionItem>
              <h2>
                <AccordionButton p="20px">
                  <Heading textAlign="left" flex="1" size="md">
                    {cred.site}
                  </Heading>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Card maxW="700px">
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="20px">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          {" "}
                          Site URL
                        </Heading>
                        <Input
                          variant="filled"
                          value={cred.url}
                          readOnly="true"
                        />
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          {" "}
                          Username
                        </Heading>
                        <Input
                          variant="filled"
                          value={cred.username}
                          readOnly="true"
                        />
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Password
                        </Heading>
                        <AInput.Password
                          variant="filled"
                          size="large"
                          readOnly="true"
                          value={cred.password}
                        />
                      </Box>
                      <HStack justifyContent={"right"} width="100%">
                        <Button
                          type="primary"
                          onClick={() => {
                            // setEditingCredentials(row);
                            // setIsEditModalOpen(true);
                            // clickTest(cred);
                            testClick(cred);
                          }}
                          leftIcon={<EditIcon />}
                        >
                          {" "}
                          Edit
                        </Button>
                        <Popconfirm
                          title="Are you sure?"
                          onConfirm={() => {
                            // handleDeleteCredentials(row.id);
                          }}
                        >
                          <Button
                            colorScheme={"red"}
                            type="primary"
                            leftIcon={<DeleteIcon />}
                            variant="outline"
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </HStack>
                    </Stack>
                  </CardBody>
                </Card>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};
