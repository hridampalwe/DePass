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
} from "@chakra-ui/react";
import {
  EditIcon,
  Search2Icon,
  DeleteIcon,
  RepeatIcon,
  AddIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { Popconfirm } from "antd";

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
  return (
    <Box maxW="95%" px="10px">
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
          <Button rightIcon={<AddIcon />} colorScheme={"gray"} variant="solid">
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
                              // setEditingCredentials(row);
                              // setIsEditModalOpen(true);
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
