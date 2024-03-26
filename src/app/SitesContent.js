import { Input as Po, Table, Space, Popconfirm } from "antd";
import {
  Heading,
  Button,
  HStack,
  Box,
  InputGroup,
  InputRightElement,
  Input,
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

export default function SitesContent() {
  return (
    <Box width={"100%"} height={"100%"}>
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
        <Button rightIcon={<AddIcon />} colorScheme={"gray"} variant="solid">
          Add
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
      <Table
        className="table_grid"
        columns={columns}
        rowKey="id"
        style={{
          borderRadius: "10px",
          border: "10px",
          borderColor: "black",
        }}
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
  );
}
