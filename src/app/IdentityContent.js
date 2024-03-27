import { Popconfirm } from "antd";
import { useState, useEffect } from "react";
import { filter } from "smart-array-filter";
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  CardBody,
  Stack,
  Input,
  HStack,
  InputGroup,
  Divider,
  Text,
  InputRightElement,
  Button,
  Drawer,
  DrawerContent,
  useToast,
  Skeleton,
  VStack,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  CheckIcon,
  RepeatIcon,
  AddIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";

export default function IdentityContent({ functions }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
  const [credentialsArr, setCredentialsArr] = useState(null);
  const [origCredentialsArr, setOrigCredentialsArr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSearchChange = (event) => setSearch(event.target.value);

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

  // Effect for loading the credentials when the contract is set.
  useEffect(() => {
    if (credentialsArr == null) {
      getIdentitiesCredentials();
    }
  }, [credentialsArr]);

  async function getIdentitiesCredentials() {
    setLoading(true);
    const recv = await functions.getCredentials("Identities");
    setCredentialsArr(recv);
    setOrigCredentialsArr(JSON.parse(JSON.stringify(recv)));
    setLoading(false);
  }

  async function handleClickSaveCredentials() {
    setLoading(true);
    if (credentials?.id) {
      await functions.handleEditCredentials(credentials);
    } else {
      await functions.handleSaveCredentials(credentials, "Identities");
    }
    onClose();
    await getIdentitiesCredentials();
  }

  function handleApplyChange() {
    const filteredData = filter(origCredentialsArr, {
      keywords: search,
    });
    setCredentialsArr(filteredData);
  }

  function handleAddChange() {
    setCredentials({});
    onOpen();
  }

  async function handleRefreshChange() {
    await getIdentitiesCredentials();
  }

  async function handleLogoutChange() {
    setCredentialsArr([]);
    functions.handleLogout();
  }

  async function handleEditChange(identity) {
    setCredentials(identity);
    onOpen();
  }

  async function handleDeleteChange(identity) {
    setLoading(true);
    await functions.handleDeleteCredentials(identity.id);
    getIdentitiesCredentials();
  }

  function IdentityAddDrawerContent() {
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
              Identity Name
            </Text>
            <Input
              type="text"
              name="title"
              size="lg"
              value={credentials?.title || ""}
              placeholder={`Enter the Identity Name`}
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              First Name
            </Text>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter the First Name"
              value={credentials?.firstName || ""}
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Last Name{" "}
            </Text>
            <Input
              type="text"
              name="lastName"
              size="lg"
              value={credentials?.lastName || ""}
              placeholder="Enter the Last Name"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Age
            </Text>
            <Input
              type="text"
              name="age"
              placeholder="Enter the age"
              value={credentials?.age || ""}
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Date of Birth
            </Text>
            <Input
              type="text"
              name="dob"
              size="lg"
              value={credentials?.dob || ""}
              placeholder="Enter the Date of Birth"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Contact No.
            </Text>
            <Input
              type="text"
              name="contact"
              size="lg"
              value={credentials?.contact || ""}
              placeholder="Enter the Contact No."
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              E-mail Address
            </Text>
            <Input
              type="text"
              name="email"
              size="lg"
              value={credentials?.email || ""}
              placeholder="Enter the E-mail ID"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              {credentials?.title || ""} Number
            </Text>
            <Input
              type="text"
              name="number"
              size="lg"
              value={credentials?.number || ""}
              placeholder={`Enter the ${credentials?.title || ""} Number`}
              onChange={handleInputChange}
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
    <Box maxW="95%" px="10px">
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
          {IdentityAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Identities</Heading>
      <Divider borderWidth="1px" borderColor="gray.200" />
      <Box pt="20px">
        <HStack
          p="5px"
          spacing="15px"
          rounded="10px"
          bg="gray.200"
          marginBottom="10px"
        >
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
              <Button rightIcon={<CheckIcon />} onClick={handleApplyChange}>
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
            Add Identity
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
        <Skeleton isLoaded={!loading}>
          <Box rounded="10px" bg="gray.200">
            <Accordion maxWidth="100%" allowToggle>
              {credentialsArr?.map((identity) => (
                <AccordionItem key={identity.id}>
                  <h2>
                    <AccordionButton p="20px">
                      <Heading textAlign="left" flex="1" size="md">
                        {identity.title}
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Card maxW="700px">
                      <CardBody>
                        <Stack spacing="20px">
                          <HStack>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                {" "}
                                First Name
                              </Heading>
                              <Input
                                variant="filled"
                                value={identity.firstName}
                                readOnly
                                onClick={(e) => copyToClipboard(e)}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                {" "}
                                lastName{" "}
                              </Heading>
                              <Input
                                variant="filled"
                                value={identity.lastName}
                                readOnly
                                onClick={(e) => copyToClipboard(e)}
                              />
                            </Box>
                          </HStack>
                          <HStack>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Age
                              </Heading>
                              <Input
                                variant="filled"
                                value={identity.age}
                                readOnly
                                onClick={(e) => copyToClipboard(e)}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Date of Birth
                              </Heading>
                              <Input
                                value={identity.dob}
                                readOnly
                                onClick={(e) => copyToClipboard(e)}
                                variant="filled"
                                type="text"
                              />
                            </Box>
                          </HStack>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Contact No.
                            </Heading>
                            <Input
                              variant="filled"
                              value={identity.contact}
                              readOnly
                              onClick={(e) => copyToClipboard(e)}
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              {" "}
                              Email Address
                            </Heading>
                            <Input
                              variant="filled"
                              value={identity.email}
                              readOnly
                              onClick={(e) => copyToClipboard(e)}
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              {" "}
                              {identity.title} number
                            </Heading>
                            <Input
                              variant="filled"
                              value={identity.number}
                              readOnly
                              onClick={(e) => copyToClipboard(e)}
                            />
                          </Box>
                          <HStack justifyContent={"right"} width="100%">
                            <Button
                              type="primary"
                              onClick={() => handleEditChange(identity)}
                              leftIcon={<EditIcon />}
                            >
                              {" "}
                              Edit
                            </Button>
                            <Popconfirm
                              title="Are you sure?"
                              onConfirm={async () =>
                                handleDeleteChange(identity)
                              }
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
    </Box>
  );
}
