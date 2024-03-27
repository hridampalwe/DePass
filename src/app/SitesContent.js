import { Input as AInput, Popconfirm } from "antd";
import { useState, useEffect } from "react";
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
  Drawer,
  Skeleton,
  DrawerContent,
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

export default function SitesContent({ functions }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
  const [credentialsArr, setCredentialsArr] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  // Effect for loading the credentials when the contract is set.
  useEffect(() => {
    if (credentialsArr == null) {
      getSitesCredentials();
    }
  }, [credentialsArr]);

  async function getSitesCredentials() {
    setLoading(true);
    const recv = await functions.getCredentials("Sites");
    setCredentialsArr(recv);
    setLoading(false);
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
              value={credentials?.site}
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
            <Input
              type="text"
              name="url"
              size="lg"
              value={credentials?.url}
              placeholder="Enter the Site URL"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Username
            </Text>
            <Input
              size="lg"
              type="text"
              name="username"
              value={credentials?.username}
              placeholder="Enter the Username"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Password
            </Text>
            <AInput.Password
              size="large"
              type="text"
              name="password"
              value={credentials?.password}
              placeholder="Enter the Password"
              onChange={handleInputChange}
              variant="filled"
            />
            <Center pt="20px">
              <Button
                colorScheme="blue"
                isLoading={loading}
                loadingText="Submitting"
                leftIcon={<CheckIcon />}
                onClick={async () => {
                  setLoading(true);
                  if (credentials?.id) {
                    await functions.handleEditCredentials(credentials);
                  } else {
                    await functions.handleSaveCredentials(credentials, "Sites");
                  }
                  onClose();
                  await getSitesCredentials();
                }}
              >
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
      <Drawer
        trapFocus="true"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="sm"
      >
        <DrawerContent
          bg={
            "radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%);"
          }
        >
          {SiteAddDrawerContent()}
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
            setCredentials({});
            onOpen();
          }}
        >
          Add Site
        </Button>
        <Button
          rightIcon={<RepeatIcon />}
          colorScheme={"gray"}
          variant="solid"
          onClick={async () => {
            await getSitesCredentials();
          }}
        >
          Refresh
        </Button>
        <Popconfirm
          title="Are you sure?"
          onConfirm={async () => {
            setCredentialsArr([]);
            functions.handleLogout();
          }}
        >
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme={"red"}
          variant="outline"
        >
          Logout
        </Button>
        </Popconfirm>
      </HStack>
      <Skeleton isLoaded={!loading}>
        <Box rounded="10px" bg="gray.200">
          <Accordion rounded="10px" allowToggle>
            {credentialsArr?.map((cred) => (
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
                              setCredentials(cred);
                              onOpen();
                            }}
                            leftIcon={<EditIcon />}
                          >
                            {" "}
                            Edit
                          </Button>
                          <Popconfirm
                            title="Are you sure?"
                            onConfirm={async () => {
                              setLoading(true);
                              await functions.handleDeleteCredentials(cred.id);
                              getSitesCredentials();
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
      </Skeleton>
      <Stack>
        <Skeleton isLoaded={!loading} height="20px" />
        <Skeleton isLoaded={!loading} height="20px" />
        <Skeleton isLoaded={!loading} height="20px" />
      </Stack>
    </Box>
  );
}
