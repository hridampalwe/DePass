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
  DrawerContent,
  Skeleton,
  VStack,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import {
  EditIcon,
  Search2Icon,
  DeleteIcon,
  CheckIcon,
  RepeatIcon,
  AddIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";

export default function IdentityContent({functions}) {
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
      getIdentitiesCredentials();
    }
  }, [credentialsArr]);

  async function getIdentitiesCredentials() {
    setLoading(true);
    const recv = await functions.getCredentials("Identities");
    setCredentialsArr(recv);
    setLoading(false);
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
              value={credentials?.title}
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
              value={credentials?.firstName}
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
              value={credentials?.lastName}
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
              value={credentials?.age}
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
              value={credentials?.dob}
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
              value={credentials?.contact}
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
              value={credentials?.email}
              placeholder="Enter the E-mail ID"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              {credentials?.title} Number
            </Text>
            <Input
              type="text"
              name="number"
              size="lg"
              value={credentials?.number}
              placeholder={`Enter the ${credentials?.title} Number`}
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
                    await functions.handleSaveCredentials(
                      credentials,
                      "Identities"
                    );
                  }
                  onClose();
                  await getIdentitiesCredentials();
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
          {IdentityAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Identity</Heading>
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
            Add Identity
          </Button>
          <Button
            rightIcon={<RepeatIcon />}
            colorScheme={"gray"}
            variant="solid"
            onClick={async () => {
              await getIdentitiesCredentials();
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
            <Accordion allowToggle>
              {credentialsArr?.map((card) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton p="20px">
                      <Heading textAlign="left" flex="1" size="md">
                        {card.title}
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
                                variant="outline"
                                value={card.firstName}
                                readOnly="true"
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                {" "}
                                lastName{" "}
                              </Heading>
                              <Input
                                variant="outline"
                                value={card.lastName}
                                readOnly="true"
                              />
                            </Box>
                          </HStack>
                          <HStack>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                age
                              </Heading>
                              <Input
                                variant="outline"
                                value={card.age}
                                readOnly="true"
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Date of Birth
                              </Heading>
                              <Input
                                variant="outline"
                                value={card.dob}
                                readOnly="true"
                                type="date"
                              />
                            </Box>
                          </HStack>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Contact No.
                            </Heading>
                            <Input
                              variant="outline"
                              value={card.contact}
                              readOnly="true"
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              {" "}
                              Email Address
                            </Heading>
                            <Input
                              variant="outline"
                              value={card.email}
                              readOnly="true"
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              {" "}
                              {card.title} number
                            </Heading>
                            <Input
                              variant="outline"
                              value={card.number}
                              readOnly="true"
                            />
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
                                getIdentitiesCredentials();
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
