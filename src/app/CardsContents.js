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

export default function CardsContents({ functions, credArr }) {
  console.log(credArr);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
  // const [credentialsArr, setCredentialsArr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [origCredentialsArr, setOrigCredentialsArr] = useState(null);
  const [search, setSearch] = useState(null);
  const toast = useToast();
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSearchChange = (event) => setSearch(event.target.value);

  // Effect for loading the credentials when the contract is set.
  // useEffect(() => {
  //   if (credentialsArr == null) {
  //     getCardsCredentials();
  //   }
  // }, [credentialsArr]);

  async function getCardsCredentials() {
    setLoading(true);
    functions.getSitesCredentials("Cards");
    // const recv = await functions.getCredentials("Cards");
    // setCredentialsArr(recv);
    // setOrigCredentialsArr(JSON.parse(JSON.stringify(recv)));
    setLoading(false);
  }

  async function handleClickSaveCredentials() {
    setLoading(true);
    if (credentials?.id) {
      await functions.handleEditCredentials(credentials);
    } else {
      await functions.handleSaveCredentials(credentials, "Cards");
    }
    onClose();
    await getCardsCredentials();
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
    await getCardsCredentials();
  }

  async function handleLogoutChange() {
    // setCredentialsArr([]);
    functions.handleLogout();
  }

  async function handleEditChange(card) {
    setCredentials(card);
    onOpen();
  }

  async function handleDeleteChange(card) {
    setLoading(true);
    await functions.handleDeleteCredentials(card.id);
    getCardsCredentials();
  }

  function cardsAddDrawerContent() {
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
              Card Name
            </Text>
            <Input
              type="text"
              name="cardName"
              placeholder="Enter the Card Name"
              value={credentials?.cardName || ""}
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Account Number
            </Text>
            <Input
              size="lg"
              type="text"
              name="accNo"
              value={credentials?.accNo || ""}
              placeholder="Enter the Card Account Number"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Expiry
            </Text>
            <Input
              size="lg"
              type="text"
              name="expiry"
              value={credentials?.expiry || ""}
              placeholder="Enter the expiry date on the card"
              onChange={handleInputChange}
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              CVV
            </Text>
            <AInput.Password
              size="large"
              name="cvv"
              value={credentials?.cvv || ""}
              placeholder="Enter the CVV"
              onChange={handleInputChange}
              variant="filled"
            />
            <Text
              style={{ fontWeight: "bold" }}
              pt="10px"
              px="10px"
              fontSize="lg"
            >
              Account Holder's Name
            </Text>
            <Input
              type="text"
              name="accholderName"
              size="lg"
              value={credentials?.accholderName || ""}
              placeholder="Enter the expiry date on the card"
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
          {cardsAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Cards</Heading>
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
              size="lg"
              onChange={handleSearchChange}
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
            onClick={handleAddChange}
            colorScheme={"gray"}
            variant="solid"
          >
            Add Card
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
              {credArr?.map((card) => (
                <AccordionItem key={card.id}>
                  <h2>
                    <AccordionButton p="20px">
                      <Heading textAlign="left" flex="1" size="md">
                        {card.cardName}
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
                              Account Number
                            </Heading>
                            <Input
                              variant="filled"
                              value={card.accNo}
                              readOnly
                              onClick={(e) => copyToClipboard(e)}
                            />
                          </Box>
                          <HStack>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Expiry Date
                              </Heading>
                              <Input
                                variant="filled"
                                value={card.expiry}
                                readOnly
                                onClick={(e) => copyToClipboard(e)}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                CVV
                              </Heading>
                              <AInput.Password
                                variant="filled"
                                value={card.cvv}
                                readOnly
                                onClick={(e) => copyToClipboard(e)}
                                size="large"
                              />
                            </Box>
                          </HStack>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Card Holder's Name
                            </Heading>
                            <Input
                              readOnly
                              onClick={(e) => copyToClipboard(e)}
                              variant="filled"
                              value={card.accholderName}
                              textTransform="uppercase"
                            />
                          </Box>
                          <HStack justifyContent={"right"} width="100%">
                            <Button
                              type="primary"
                              onClick={() => handleEditChange(card)}
                              leftIcon={<EditIcon />}
                            >
                              {" "}
                              Edit
                            </Button>
                            <Popconfirm
                              title="Are you sure?"
                              onConfirm={() => handleDeleteChange(card)}
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
