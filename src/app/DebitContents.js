import { Input as AInput, Popconfirm } from "antd";
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
  DrawerOverlay,
  DrawerContent,
  Text,
  useDisclosure,
  Center,
  DrawerBody,
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
import { useState } from "react";

const cards = [
  {
    cardName: "Indian Bank Debit",
    accNo: "9812 1231 1231 3123",
    expiry: "5/2027",
    cvv: "322",
    accholderName: "Hridam Palwe",
  },
  {
    cardName: "State Bank of India Debit",
    accNo: "9812 1231 1231 3123",
    expiry: "5/2027",
    cvv: "322",
    accholderName: "Hridam Palwe",
  },
  {
    cardName: "Punjab Bank Debit",
    accNo: "9812 1231 1231 3123",
    expiry: "5/2027",
    cvv: "322",
    accholderName: "Hridam Palwe",
  },
  {
    cardName: "HDFC Credit Card",
    accNo: "9812 1231 1231 3123",
    expiry: "5/2027",
    cvv: "322",
    accholderName: "Hridam Palwe",
  },
];

export default function DebitContents() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  function debitAddDrawerContent() {
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
              <Button colorScheme="blue" leftIcon={<CheckIcon />}>
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
          {debitAddDrawerContent()}
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
          >
            Refresh
          </Button>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme={"red"}
            variant="outline"
          >
            Logout
          </Button>
        </HStack>
        <Box rounded="10px" bg="gray.200">
          <Accordion py="" allowToggle>
            {cards.map((card) => (
              <AccordionItem>
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
                            readOnly="true"
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
                              readOnly="true"
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              CVV
                            </Heading>
                            <Input
                              variant="filled"
                              value={card.cvv}
                              readOnly="true"
                            />
                          </Box>
                        </HStack>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Card Holder's Name
                          </Heading>
                          <Input
                            readOnly="true"
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
                            onConfirm={() => {
                              // handleDeleteCredentials(row.id);
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
      </Box>
    </Box>
  );
}
