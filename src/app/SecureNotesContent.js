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
import TextArea from "antd/es/input/TextArea";

const cards = [
  {
    Name: "Software License Information",
    Notes:
      "Please ensure compliance with licensing agreements and keep track of renewal dates.",
  },
  {
    Name: "Insurance Accounts",
    Notes:
      " Keep up-to-date records of insurance policies, premiums, and contact information for insurance providers.",
  },
  {
    Name: "Stock Information",
    Notes:
      "Monitor stock performance regularly and consider diversification for investment portfolios.",
  },
  {
    Name: "Social Security Information",
    Notes:
      "Safeguard sensitive social security information and follow best practices for data security.",
  },
];

export default function DebitContents() {
  return (
    <Box maxW="95%" px="10px">
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
          <Button rightIcon={<AddIcon />} colorScheme={"gray"} variant="solid">
            Add Notes
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
                      {card.Name}
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
                          <TextArea isReadOnly value={card.Notes} />
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
