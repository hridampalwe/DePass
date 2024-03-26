import { Input as AInput, Popconfirm } from "antd";
import {
  Heading,
  Button,
  HStack,
  Box,
  InputGroup,
  InputRightElement,
  Divider,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  CardBody,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import {
  EditIcon,
  Search2Icon,
  DeleteIcon,
  RepeatIcon,
  AddIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";

const credentialsArr = [
  {
    id: 1,
    url: "pakode.com",
    site: "pakode",
    username: "pakdoea",
    password: "Blahhhh",
  },
  {
    id: 2,
    url: "lasn.com",
    site: "lasn",
    username: "pakdoea",
    password: "Blahhhh",
  },
  {
    id: 3,
    url: "yoyo.com",
    site: "yoyo",
    username: "pakdoea",
    password: "Blahhhh",
  },
  {
    id: 4,
    url: "sakshi.com",
    site: "sakshi",
    username: "gay",
    password: "Blahhhh",
  },
];

export default function SitesContent() {
  return (
    <Box width={"95%"} px="10px" height={"100%"}>
      <Heading size="3xl">Sites</Heading>
      <Divider borderWidth="1px" borderColor="gray.200" />
      <HStack
        marginTop="20px"
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
          Add Site
        </Button>
        <Button rightIcon={<RepeatIcon />} colorScheme={"gray"} variant="solid">
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
        <Accordion rounded="10px" allowToggle>
          {credentialsArr.map((cred) => (
            <AccordionItem>
              <h2>
                <AccordionButton p="20px">
                  <Heading textAlign="left" flex="1" size="md">
                    {cred.site}
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
                          Site URL
                        </Heading>
                        <Input
                          variant="filled"
                          value={cred.url}
                          readOnly="true"
                        />
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          {" "}
                          Username
                        </Heading>
                        <Input
                          variant="filled"
                          value={cred.username}
                          readOnly="true"
                        />
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Password
                        </Heading>
                        <AInput.Password
                          variant="filled"
                          size="large"
                          readOnly="true"
                          value={cred.password}
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
  );
}
