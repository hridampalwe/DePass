import { Input as AInput, Popconfirm } from "antd";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Drawer,
  DrawerContent,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Stack,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  ArrowForwardIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import { filter } from "smart-array-filter";

export default function SitesContent({ functions, credArr }) {
  console.log(credArr);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);

  // const [credentialsArr, setCredentialsArr] = useState(null);
  const [origCredentialsArr, setOrigCredentialsArr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const toast = useToast();
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSearchChange = (event) => setSearch(event.target.value);

  // Effect for loading the credentials when the contract is set.
  // useEffect(() => {
  //   if (credentialsArr == null) {
  //     getSitesCredentials();
  //   }
  // }, [credentialsArr]);

  async function getSitesCredentials() {
    setLoading(true);
    // functions.changeEditVal();
    await functions.getCredentialsForSites();
    // const recv = await functions.getCredentials("Sites");
    // // setCredentialsArr(recv);
    // setOrigCredentialsArr(JSON.parse(JSON.stringify(recv)));
    setLoading(false);
  }

  async function handleClickSaveCredentials() {
    setLoading(true);
    if (credentials?.id) {
      await functions.handleEditCredentials(credentials);
    } else {
      await functions.handleSaveCredentials(credentials, "Sites");
    }
    onClose();
    await getSitesCredentials();
  }

  function handleApplyChange() {
    const filteredData = filter(origCredentialsArr, {
      keywords: search,
    });
    // setCredentialsArr(filteredData);
  }

  function handleAddChange() {
    setCredentials({});
    onOpen();
  }
  function copyToClipboard(e) {
    navigator.clipboard.writeText(e.target.value);
    // message.success("Site copied to clipboard");
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  }

  async function handleRefreshChange() {
    await getSitesCredentials();
  }

  async function handleLogoutChange() {
    // setCredentialsArr([]);
    functions.handleLogout();
  }

  async function handleEditChange(site) {
    setCredentials(site);
    onOpen();
  }

  async function handleDeleteChange(site) {
    setLoading(true);
    await functions.handleDeleteCredentials(site.id);
    getSitesCredentials();
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
              value={credentials?.site || ""}
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
              value={credentials?.url || ""}
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
              value={credentials?.username || ""}
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
              value={credentials?.password || ""}
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
                onClick={handleClickSaveCredentials}
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
      <Heading size="2xl">Sites</Heading>
      <Divider borderWidth="1px" borderColor="gray.200" />
      <VStack
        rounded="10px"
        bg="gray.200"
        marginTop="20px"
        p="10px"
        spacing="20px"
        marginBottom="10px"
        // alignItems="left"
      >
        <HStack width="100%">
          <InputGroup size="lg">
            <Input
              onChange={handleSearchChange}
              size="lg"
              variant="filled"
              borderColor="rgba(0, 0, 0, 0.1)"
              borderWidth="2px"
              placeholder="Search Filter"
            />
            <InputRightElement width="120px">
              <Button
                size="md"
                // variant="outline"
                rightIcon={<CheckIcon />}
                onClick={handleApplyChange}
              >
                Apply
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            rightIcon={<AddIcon />}
            colorScheme={"gray"}
            variant="solid"
            onClick={handleAddChange}
          >
            Add Site
          </Button>
          <Button
            rightIcon={<RepeatIcon />}
            colorScheme={"gray"}
            variant="solid"
            onClick={handleRefreshChange}
          >
            Refresh
          </Button>
          <Popconfirm title="Are you sure?" onConfirm={handleLogoutChange}>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme={"red"}
              variant="outline"
            >
              Logout
            </Button>
          </Popconfirm>
        </HStack>
        <Heading mx="5px" fontSize="20px">
          View, Modify, or Delete stored login details within your DePass
          Account.
        </Heading>
      </VStack>
      <Skeleton isLoaded={!loading}>
        <Box rounded="10px" bg="gray.200">
          <Accordion rounded="10px" allowToggle>
            {credArr?.map((site) => (
              <AccordionItem key={site.id}>
                <h2>
                  <AccordionButton p="20px">
                    <Heading textAlign="left" flex="1" size="md">
                      {site.site}
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
                            value={site.url}
                            readOnly
                            onClick={(e) => copyToClipboard(e)}
                          />
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            {" "}
                            Username
                          </Heading>
                          <Input
                            onClick={(e) => copyToClipboard(e)}
                            variant="filled"
                            value={site.username}
                            readOnly
                          />
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Password
                          </Heading>
                          <AInput.Password
                            variant="filled"
                            size="large"
                            readOnly
                            onClick={(e) => copyToClipboard(e)}
                            value={site.password}
                          />
                        </Box>
                        <HStack justifyContent={"right"} width="100%">
                          <Button
                            type="primary"
                            onClick={() => {
                              handleEditChange(site);
                            }}
                            leftIcon={<EditIcon />}
                          >
                            {" "}
                            Edit
                          </Button>
                          <Popconfirm
                            title="Are you sure?"
                            onConfirm={() => handleDeleteChange(site)}
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
    </Box>
  );
}
