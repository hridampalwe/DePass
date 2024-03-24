import { useEffect, useState } from "react";
import { Input as Po, Button as AButton } from "antd";
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
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
// import {
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from "@chakra-ui/react";
import {
  EditIcon,
  Search2Icon,
  DeleteIcon,
  RepeatIcon,
  AddIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";

import {
  Space,
  Popconfirm,
  Modal,
  message,
  Table,
  notification,
  Spin,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const credentialsArr = [
  { id: 1, site: "pakode", username: "pakdoea", password: "Blahhhh" },
  { id: 2, site: "lasn", username: "pakdoea", password: "Blahhhh" },
  { id: 3, site: "yoyo", username: "pakdoea", password: "Blahhhh" },
  { id: 4, site: "sakshi", username: "gay", password: "Blahhhh" },
];

const columns = [
  {
    title: "Site",
    key: "site",
    sorter: (a, b) => a.site.localeCompare(b.site),
    ellipsis: true,
    width: "20%",
    render: ({ site }) => (
      <Po
        readOnly
        type="text"
        size="large"
        value={site}
        // copy to clipboard on click
        onClick={(e) => {
          navigator.clipboard.writeText(e.target.value);
          message.success("Site copied to clipboard");
        }}
      />
    ),
  },
  {
    title: "Username",
    sorter: (a, b) => a.username.localeCompare(b.username),
    key: "username",
    width: "20%",
    render: ({ username }) => (
      <Po
        readOnly
        type="text"
        size="large"
        value={username}
        onClick={(e) => {
          navigator.clipboard.writeText(e.target.value);
          message.success("Username copied to clipboard");
        }}
      />
    ),
  },
  {
    title: "Password",
    key: "password",
    sorter: false,
    width: "20%",
    render: ({ password }) => (
      <Po.Password
        readOnly
        value={password}
        size="large"
        // copy to clipboard
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(password);
          message.success("Password copied to clipboard");
        }}
      />
    ),
  },
  {
    title: "Actions",
    width: "10%",
    render: (row) => (
      <Space size="small">
        <Button
          type="primary"
          onClick={() => {
            console.log("row", row);
            // setEditingCredentials(row);
            // setIsEditModalOpen(true);
          }}
        >
          <EditIcon />
        </Button>
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => {
            // handleDeleteCredentials(row.id);
          }}
        >
          <Button colorScheme={"red"} type="primary" danger>
            <DeleteIcon />
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

export default function Dashboard({}) {
  return (
    <Box width={"100vw"} height={"100vh"} p={"20px"}>
      <Box rounded={"10px"} p={"10px"} height={"100%"} boxShadow="dark-lg">
        <HStack alignItems={"flex-start"} height={"100%"} pt={"40px"}>
          <Box >
            <Stack>
              <Button
                justifyContent="flex-start"
                colorScheme="gray"
                variant="outline"
              >
                Site
              </Button>
              <Button
                justifyContent="flex-start"
                colorScheme="gray"
                variant="outline"
              >
                Secure Notes
              </Button>
              <Button
                justifyContent="flex-start"
                colorScheme="gray"
                variant="outline"
              >
                Cards
              </Button>
              <Button
                justifyContent="flex-start"
                colorScheme="gray"
                variant="outline"
              >
                Files
              </Button>
            </Stack>
          </Box>
          {/* <Divider borderLeftWidth={"6px"} orientation='vertical' height="1000px" /> */}
          <Box width={"100%"} height={"100%"} borderLeft={"2px"} borderLeftColor={"gray.200"} px={"20px"}>
            <Heading
              textAlign="center"
              size="xl"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
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
              <Button
                rightIcon={<AddIcon />}
                colorScheme={"gray"}
                variant="solid"
              >
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
            <Table
              className="table_grid"
              columns={columns}
              rowKey="id"
              dataSource={credentialsArr}
              scroll={{ x: 970 }}
              pagination={{
                pageSizeOptions: [10, 25, 50, 100],
                showSizeChanger: true,
                defaultCurrent: 1,
                defaultPageSize: 10,
                size: "default",
              }}
              onChange={() => {}}
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
