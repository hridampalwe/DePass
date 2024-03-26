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
    Title: "Aadhaar Card",
    Age: "22",
    "First Name": "Sakshi",
    "Middle Name": "",
    "Last Name": "Agrawal",
    "Date of Birth": "02/09/2001",
    "Contact No.": 9302770111,
    "E-mail Address": "sakshiagrawal2445@gmail.com",
    Number: 655787766789,
  },
  {
    Title: "Driving License",
    Age: "22",
    "First Name": "Sakshi",
    "Middle Name": "",
    "Last Name": "Agrawal",
    "Date of Birth": "02/09/2001",
    "Contact No.": 9302770111,
    "E-mail Address": "sakshiagrawal2445@gmail.com",
    Number: 655787766789,
  },
  {
    Title: "PAN Card",
    Age: "22",
    "First Name": "Sakshi",
    "Middle Name": "",
    "Last Name": "Agrawal",
    "Date of Birth": "02/09/2001",
    "Contact No.": 9302770111,
    "E-mail Address": "sakshiagrawal2445@gmail.com",
    Number: 655787766789,
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
            Add Identity
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
                      {card.Title}
                    </Heading>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Card maxW="700px">
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing="20px">
                        <HStack>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              {" "}
                              First Name
                            </Heading>
                            <Input
                              variant="filled"
                              value={card["First Name"]}
                              readOnly="true"
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              {" "}
                              Middle Name
                            </Heading>
                            <Input
                              variant="filled"
                              value={card["Middle Name"]}
                              readOnly="true"
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              {" "}
                              Last Name
                            </Heading>
                            <Input
                              variant="filled"
                              value={card["Last Name"]}
                              readOnly="true"
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
                              value={card.Age}
                              readOnly="true"
                            />
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Date of Birth
                            </Heading>
                            <Input
                              variant="filled"
                              value={card["Date of Birth"]}
                              readOnly="true"
                              type="date"
                            />
                          </Box>
                        </HStack>
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
