import { useEffect, useState } from "react";
import { Input as Po } from "antd";
import {
  ChakraProvider,
  Heading,
  Text,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Stack,
  Button,
  Image,
  HStack,
  Box,
  InputGroup,
  InputRightElement,
  Input,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
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
  { id: 1, site: "pakode", username: "pakdoea", password: "Blahhhh" },
  { id: 2, site: "lasn", username: "pakdoea", password: "Blahhhh" },
  { id: 3, site: "yoyo", username: "pakdoea", password: "Blahhhh" },
  { id: 4, site: "sakshi", username: "gay", password: "Blahhhh" },
];
const columns = ["site", "username", "password"];

export default function Dashboard({}) {
  return (
    <Box width={"100vw"} height={"100vh"} p={"40px"}>
      <Box rounded={"10px"} p={"40px"} height={"100%"} boxShadow="dark-lg">
        <Heading textAlign="center" size="lg" color="black">
          DePass: Decentralised Password Manager
        </Heading>
        <HStack py="2%" spacing="5px">
          <InputGroup size="md">
            <Input size="md" placeholder="Search sites" />
            <InputRightElement width="100px">
              <Button size="md" rightIcon={<Search2Icon />}>
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button rightIcon={<AddIcon />} colorScheme={"gray"} variant="solid">
            Add
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
        <Table variant="simple" colorScheme="gray" size="lg" width="full">
          <Thead>
            <Tr>
              <Th width="600px">Site</Th>
              <Th> Username </Th>
              <Th> Password </Th>
              <Th width="40px">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {credentialsArr.map((item) => (
              <Tr>
                {columns.map((column) => (
                  <Td>
                    {/* <InputGroup> */}
                    {column != "password" && (
                      <Po
                        size="large"
                        readOnly
                        value={item[column]}
                        onClick={(e) => {
                          navigator.clipboard.writeText(e.target.value);
                        }}
                      />
                    )}
                    {column == "password" && (
                      <Po.Password
                        size="large"
                        readOnly
                        value={item[column]}
                        onClick={(e) => {
                          navigator.clipboard.writeText(e.target.value);
                        }}
                      />
                    )}
                  </Td>
                ))}
                <Td>
                  <Stack direction="row" spacing={2}>
                    <Button
                      // leftIcon={<EmailIcon />}
                      colorScheme="teal"
                      variant="outline"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      // rightIcon={<ArrowForwardIcon />}
                      colorScheme="red"
                      variant="solid"
                    >
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
