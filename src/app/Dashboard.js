import { Input as Po, Table, Space, Popconfirm } from "antd";
import SimpleSidebar from "./Sidebar";
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
import {useState} from "react";

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
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);

  const toggleDashboardVisibility = () => {
    setIsDashboardVisible((prev) => !prev);
  };

  return (
    <Box width={"100vw"} height={"100vh"} p={"20px"}>
      <Box
        rounded={"10px"}
        p={"10px"}
        bg={
          "radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%);"
        }
        height={"100%"}
        boxShadow="dark-lg"
      >
        <HStack alignItems={"flex-start"} height={"100%"} pt={"40px"}>
          <SimpleSidebar toggleDashboard={toggleDashboardVisibility} isDashboardVisible={isDashboardVisible}/>
          {isDashboardVisible && <Box
            width={"100%"}
            height={"100%"}
            px={"20px"}
            borderLeft="2px"
            borderLeftColor="gray.200"
          >
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
          </Box>}
        </HStack>
      </Box>
    </Box>
  );
}
