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
  Skeleton,
  SkeletonText,
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
import { PasswordInput, PasswordInputDrawer } from "./PasswordInput";
import { useEffect, useState } from "react";

import { Popconfirm } from "antd";
import { filter } from "smart-array-filter";
import getColorValues from "./colorValues";

export default function SitesContent({ functions, credArr }) {
  const colorValues = getColorValues();
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

  useEffect(() => {
    if (!credArr) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [credArr?.length]);

  async function getSitesCredentials() {
    setLoading(true);
    await functions.getSitesCredentials("Sites");
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
          <Divider borderColor={colorValues.gray200} />
          <Box bg={colorValues.valueCardBg} rounded="10px" p="20px">
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
              size="lg"
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
            <PasswordInputDrawer
              value={credentials?.password || ""}
              handleInputChange={handleInputChange}
              keyVal="password"
              placeholder="Enter the password"
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
      <Drawer
        trapFocus="true"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="sm"
      >
        <DrawerContent bg={colorValues.bgGradientMainUI}>
          {SiteAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <HStack>
        <Heading size="2xl">Sites </Heading>
      </HStack>
      <Divider borderWidth="1px" borderColor={colorValues.dividerColor} />
      <VStack
        rounded="10px"
        bg={colorValues.gray200}
        marginTop="20px"
        p="10px"
        spacing="20px"
        marginBottom="10px"
        // alignItems="left"
      >
        <HStack width="100%">
          <Input
            onChange={handleSearchChange}
            size="lg"
            variant="filled"
            borderColor="rgba(0, 0, 0, 0.1)"
            borderWidth="2px"
            placeholder="Search Filter"
          />
          <Button
            rightIcon={<AddIcon />}
            size="lg"
            variant="solid"
            onClick={handleAddChange}
          >
            Add Site
          </Button>
          <Button
            rightIcon={<RepeatIcon />}
            size="lg"
            variant="solid"
            onClick={handleRefreshChange}
          >
            Refresh
          </Button>
          <Popconfirm title="Are you sure?" onConfirm={handleLogoutChange}>
            <Button
              rightIcon={<ArrowForwardIcon />}
              size="lg"
              colorScheme={"red"}
              variant="outline"
            >
              Logout
            </Button>
          </Popconfirm>
        </HStack>
        <Text mx="5px" fontSize="18px">
          Welcome to our secure login information page, your digital vault for
          storing access keys to your online world.
        </Text>
      </VStack>
      <SkeletonText
        mt="4"
        isLoaded={!loading}
        noOfLines={4}
        spacing="4"
        skeletonHeight="10"
      >
        <Box rounded="10px" bg={colorValues.gray200}>
          <Accordion allowToggle>
            {credArr &&
              filter(credArr, {
                keywords: search,
              })?.map((site) => (
                <AccordionItem border="0px" key={site.id}>
                  <h2>
                    <AccordionButton p="20px">
                      <Heading textAlign="left" flex="1" size="md">
                        {site.site}
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Card bg={colorValues.valueCardBg} maxW="700px">
                      <CardBody>
                        <Stack divider={<StackDivider />} spacing="20px">
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Site URL
                            </Heading>
                            <Input
                              variant="filled"
                              value={site.url}
                              size="lg"
                              readOnly
                              onClick={(e) => copyToClipboard(e)}
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Username
                            </Heading>
                            <Input
                              onClick={(e) => copyToClipboard(e)}
                              variant="filled"
                              size="lg"
                              value={site.username}
                              readOnly
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Password
                            </Heading>
                            <PasswordInput
                              value={site.password}
                              copyToClipboard={copyToClipboard}
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
      </SkeletonText>
    </Box>
  );
}
