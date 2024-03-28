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
  StackDivider,
  Input,
  HStack,
  InputGroup,
  Divider,
  Text,
  InputRightElement,
  Button,
  Drawer,
  Skeleton,
  DrawerContent,
  VStack,
  Center,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  RepeatIcon,
  CheckIcon,
  AddIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";

export default function SecurenotesContent({ functions, credArr }) {
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
  //     getNotesCredentials();
  //   }
  // }, [credentialsArr]);

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

  async function getNotesCredentials() {
    setLoading(true);
    await functions.getSitesCredentials("Notes");
    // const recv = await functions.getCredentials("Notes");
    // setCredentialsArr(recv);
    // setOrigCredentialsArr(JSON.parse(JSON.stringify(recv)));
    setLoading(false);
  }

  async function handleClickSaveCredentials() {
    setLoading(true);
    if (credentials?.id) {
      await functions.handleEditCredentials(credentials);
    } else {
      await functions.handleSaveCredentials(credentials, "Notes");
    }
    onClose();
    await getNotesCredentials();
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

  async function handleRefreshChange() {
    await getNotesCredentials();
  }

  async function handleLogoutChange() {
    // setCredentialsArr([]);
    functions.handleLogout();
  }

  async function handleEditChange(note) {
    setCredentials(note);
    onOpen();
  }

  async function handleDeleteChange(note) {
    setLoading(true);
    await functions.handleDeleteCredentials(note.id);
    getNotesCredentials();
  }

  function notesAddDrawerContent() {
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
              Name
            </Text>
            <Input
              type="text"
              name="name"
              placeholder="Enter the Notes Name"
              value={credentials?.name || ""}
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Notes
            </Text>
            <Input
              type="text"
              name="notes"
              size="lg"
              value={credentials?.notes || ""}
              placeholder="Enter the Notes"
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
          {notesAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Secure Notes</Heading>
      <Divider borderWidth="1px" borderColor="gray.200" />
      <Box pt="20px">
        <HStack
          p="5px"
          spacing="10px"
          rounded="10px"
          bg="gray.200"
          marginBottom="10px"
        >
          <InputGroup size="lg">
            <Input
              onChange={handleSearchChange}
              size="lg"
              placeholder="Search Filter"
              variant="filled"
              borderColor="rgba(0, 0, 0, 0.1)"
              borderWidth="2px"
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
            Add notes
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
            <Accordion py="" allowToggle>
              {credArr?.map((note) => (
                <AccordionItem key={note.id}>
                  <h2>
                    <AccordionButton p="20px">
                      <Heading textAlign="left" flex="1" size="md">
                        {note.name}
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Card maxW="700px">
                      <CardBody>
                        <Stack spacing="20px">
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Notes
                            </Heading>
                            <Box
                              mt="5px"
                              p="10px"
                              rounded="10px"
                              border="1px"
                              bg="gray.100"
                            >
                              <Text>{note.notes}</Text>
                            </Box>
                          </Box>
                          <HStack justifyContent={"right"} width="100%">
                            <Button
                              type="primary"
                              onClick={() => handleEditChange(note)}
                              leftIcon={<EditIcon />}
                            >
                              {" "}
                              Edit
                            </Button>
                            <Popconfirm
                              title="Are you sure?"
                              onConfirm={async () => handleDeleteChange(note)}
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
