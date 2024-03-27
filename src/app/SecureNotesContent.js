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
import { Popconfirm } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

const cards = [
  {
    name: "Software License Information",
    notes:
      "Please ensure compliance with licensing agreements and keep track of renewal dates.",
  },
  {
    name: "Insurance Accounts",
    notes:
      " Keep up-to-date records of insurance policies, premiums, and contact information for insurance providers.",
  },
  {
    name: "Stock Information",
    notes:
      "Monitor stock performance regularly and consider diversification for investment portfolios.",
  },
  {
    name: "Social Security Information",
    notes:
      "Safeguard sensitive social security information and follow best practices for data security.",
  },
];

export default function SecurenotesContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState(null);
  const [credential, setCredential] = useState(null);
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

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
          {notesAddDrawerContent()}
        </DrawerContent>
      </Drawer>
      <Heading size="2xl">Secure notes</Heading>
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
          <Button rightIcon={<AddIcon />} colorScheme={"gray"} variant="solid" onClick={() => {
            setCredentials({});
            onOpen();
          }}>
            Add notes
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
                            notes
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
