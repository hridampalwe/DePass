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
  InputRightElement,
  Button,
  VStack,
  Drawer,
  Skeleton,
  DrawerContent,
  Text,
  useDisclosure,
  Center,
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

export default function CardsContents({ functions }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
  const [credentialsArr, setCredentialsArr] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (credentialsArr == null) {
      getCardsCredentials();
    }
  }, [credentialsArr]);

  async function getCardsCredentials() {
    setLoading(true);
    const recv = await functions.getCredentials("Cards");
    setCredentialsArr(recv);
    setLoading(false);
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
              value={credentials?.cardName}
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
              value={credentials?.accNo}
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
              value={credentials?.expiry}
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
              value={credentials?.cvv}
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
              value={credentials?.accholderName}
              placeholder="Enter the expiry date on the card"
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
                    await functions.handleSaveCredentials(credentials, "Cards");
                  }
                  onClose();
                  await getCardsCredentials();
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
          {cardsAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Cards</Heading>
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
            <Input size="lg" placeholder="Search sites" />
            <InputRightElement width="120px">
              <Button rightIcon={<Search2Icon />}>Search</Button>
            </InputRightElement>
          </InputGroup>
          <Button
            rightIcon={<AddIcon />}
            onClick={() => {
              setCredentials({});
              onOpen();
            }}
            colorScheme={"gray"}
            variant="solid"
          >
            Add Card
          </Button>
          <Button
            rightIcon={<RepeatIcon />}
            colorScheme={"gray"}
            variant="solid"
            onClick={async () => {
              await getCardsCredentials();
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
                              variant="filled"
                              value={card.accholderName}
                              textTransform="uppercase"
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
                                getCardsCredentials();
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
