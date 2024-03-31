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
  SkeletonText,
  Stack,
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

import { Popconfirm } from "antd";
import { filter } from "smart-array-filter";
import getColorValues from "./colorValues";

export default function SecurenotesContent({ functions, credArr }) {
  const colorValues = getColorValues();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
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

  function copyToClipboard(e) {
    navigator.clipboard.writeText(e.target.value);
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

    setLoading(false);
  }

  async function handleClickSaveCredentials() {
    setLoading(true);
    if (credentials?.id || (credentials && credentials.id === 0)) {
      await functions.handleEditCredentials(credentials);
      let getCredAtId = credArr.find(
        (element) => element.id === credentials.id
      );
      for (const key in credentials) {
        if (Object.prototype.hasOwnProperty.call(credentials, key)) {
          getCredAtId[key] = credentials[key];
        }
      }
    } else {
      const credId = await functions.handleSaveCredentials(
        credentials,
        "Notes"
      );
      credentials.id = credId;
      credArr.push(credentials);
    }
    setLoading(false);
    onClose();
  }

  function handleAddChange() {
    setCredentials({});
    onOpen();
  }

  async function handleRefreshChange() {
    await getNotesCredentials();
  }

  async function handleLogoutChange() {
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
          <Divider borderColor={colorValues.gray200} />
          <Box bg={colorValues.valueCardBg} rounded="10px" p="20px">
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
              size="lg"
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
        <DrawerContent bg={colorValues.bgGradientMainUI}>
          {notesAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Secure Notes</Heading>
      <Divider borderWidth="1px" borderColor={colorValues.gray200} />
      <Box>
        <VStack
          rounded="10px"
          bg={colorValues.gray200}
          marginTop="20px"
          p="10px"
          spacing="20px"
          marginBottom="10px"
        >
          <HStack width="100%">
            <Input
              onChange={handleSearchChange}
              size="lg"
              placeholder="Search Filter"
              variant="filled"
              borderColor="rgba(0, 0, 0, 0.1)"
              borderWidth="2px"
            />
            <Button
              rightIcon={<AddIcon />}
              variant="solid"
              size="lg"
              onClick={handleAddChange}
            >
              Add notes
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
                colorScheme={"red"}
                size="lg"
                variant="outline"
              >
                Logout
              </Button>
            </Popconfirm>
          </HStack>
          <Text mx="5px" fontSize="18px">
            Welcome to your personal vault for thoughts and ideas - our secure
            notes page.
          </Text>
        </VStack>

        <SkeletonText
          isLoaded={!loading}
          mt="4"
          noOfLines={4}
          spacing="4"
          skeletonHeight="10"
        >
          <Box rounded="10px" bg={colorValues.gray200}>
            <Accordion py="" allowToggle>
              {credArr &&
                filter(credArr, {
                  keywords: search,
                })?.map((note) => (
                  <AccordionItem border="0px" key={note.id}>
                    <h2>
                      <AccordionButton p="20px">
                        <Heading textAlign="left" flex="1" size="md">
                          {note.name}
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Card bg={colorValues.valueCardBg} maxW="700px">
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
                                bg={colorValues.gray200}
                              >
                                <Text onClick={(e) => copyToClipboard(e)}>{note.notes}</Text>
                              </Box>
                            </Box>
                            <HStack justifyContent={"right"} width="100%">
                              <Button
                                type="primary"
                                onClick={() => handleEditChange(note)}
                                leftIcon={<EditIcon />}
                              >
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
        </SkeletonText>
      </Box>
    </Box>
  );
}
