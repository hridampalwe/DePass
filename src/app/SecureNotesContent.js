import { Input as AInput, Popconfirm } from "antd";
import { useState, useEffect } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import {
  EditIcon,
  Search2Icon,
  DeleteIcon,
  RepeatIcon,
  CheckIcon,
  AddIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import TextArea from "antd/es/input/TextArea";

export default function SecurenotesContent({ functions }) {
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
      getNotesCredentials();
    }
  }, [credentialsArr]);

  async function getNotesCredentials() {
    setLoading(true);
    const recv = await functions.getCredentials("Notes");
    setCredentialsArr(recv);
    setLoading(false);
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
              value={credentials?.name}
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
              value={credentials?.notes}
              placeholder="Enter the Notes"
              onChange={handleInputChange}
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
                    await functions.handleSaveCredentials(credentials, "Notes");
                  }
                  onClose();
                  await getNotesCredentials();
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
          p="3px"
          spacing="5px"
          rounded="10px"
          bg="gray.200"
          marginBottom="10px"
        >
          <InputGroup size="lg">
            <Input size="lg" placeholder="Search notes" />
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
            Add notes
          </Button>
          <Button
            rightIcon={<RepeatIcon />}
            colorScheme={"gray"}
            variant="solid"
            onClick={async () => {
              await getNotesCredentials();
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
            <Accordion py="" allowToggle>
              {credentialsArr?.map((card) => (
                <AccordionItem key={card.id}>
                  <h2>
                    <AccordionButton p="20px">
                      <Heading textAlign="left" flex="1" size="md">
                        {card.name}
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
                              Notes
                            </Heading>
                            <TextArea isReadOnly value={card.notes} />
                          </Box>
                          <HStack justifyContent={"right"} width="100%">
                            <Button
                              type="primary"
                              onClick={() => {
                                setCredentials(card);
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
                                await functions.handleDeleteCredentials(
                                  card.id
                                );
                                getNotesCredentials();
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
    </Box>
  );
}
