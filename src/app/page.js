"use client";
import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { useRouter } from "next/navigation";
// import Head from "next/head";
import Lit from "./lib/lit.js";
import {
  // Space,
  // Button,
  // Input,
  // Popconfirm,
  // Modal,
  // message,
  // Table,
  notification,
  // Spin,
} from "antd";
// import {
//   PlusCircleOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   SyncOutlined,
// } from "@ant-design/icons";
// import styles from "./styles/Home.module.css";
import {
  ChakraProvider,
  Container,
  Heading,
  Text,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Button,
  Image,
  Box,
  Flex,
} from "@chakra-ui/react";
import logo from "../../public/blockChain.png";
//Fetch the contract address from env.
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
//Using the contract ABI from the compiled contract.
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "addKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "updateKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "deleteKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyKeys",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "ipfsHash",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isDeleted",
            type: "bool",
          },
        ],
        internalType: "struct Keymanager.Key[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export default function Home() {
  const router = useRouter();
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [credentialsArr, setCredentialsArr] = useState([]);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [logMessage, setLogMessage] = useState("");
  const [log, setLog] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCredentials, setEditingCredentials] = useState("");

  //Function to use AntD notifications and set message and description
  const handleNotification = ({ type, message, description }) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 6,
    });
    setLog(null);
  };

  //ACC for the LIT Protocol for stroging the encryption over to the Blockchain.
  const accessControlConditions = [
    {
      contractAddress: "",
      standardContractType: "",
      chain: "ethereum",
      method: "",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: "=",
        value: account,
      },
    },
  ];

  //Defining columns for the Table of AntD
  const columns = [
    {
      title: "Site",
      key: "site",
      // sorter: (a, b) => a.site.localeCompare(b.site),
      ellipsis: true,
      width: "20%",
      render: ({ site }) => (
        <Input
          readOnly
          type="text"
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
      // sorter: (a, b) => a.username.localeCompare(b.username),
      key: "username",
      width: "20%",
      render: ({ username }) => (
        <Input
          readOnly
          type="text"
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
        <Input.Password
          readOnly
          value={password}
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
              setEditingCredentials(row);
              setIsEditModalOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => {
              handleDeleteCredentials(row.id);
            }}
          >
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //Handle the connection of wallet through meta mask account.
  const handleConnectWallet = async () => {
    try {
      if (window?.ethereum) {
        setLoading(true);
        // Check for the MetaMask extension and connect to the window.ethereum class.
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        //Fetch the accounts.
        console.log("Using account: ", accounts[0]);
        console.log(accounts);
        const provider = new Web3Provider(window.ethereum); // Fetch the provider (Connecting to account of ethereum network)
        console.log(provider);
        setProvider(provider);
        setAccount(accounts[0]); // Add an option to select the account here. instead of hardcoding
        const signer = provider.getSigner();
        const contract = new Contract(contractAddress, abi, signer); // To be discussed further. Why are we using signer here.
        setContract(contract);
        console.log(contract);
        setLog({
          type: "info",
          message: "Wallet connected successfully",
          description: "",
        });
        setLoading(false);
      } else {
        console.log("Please use Web3 enabled browser");
        setLog({
          type: "error",
          message: "Please use Web3 enabled browser",
          description: "",
        });
      }
    } catch (err) {
      console.log("Error connecting wallet", err);
      setLog({
        type: "error",
        message: "Something went wrong while connecting wallet!",
        description: "",
      });
    }
  };

  //Fetch Credentials from pinata through the IPFS Hash.
  const fetchCredentials = async (_ipfsHash) => {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_GATEWAY}/ipfs/${_ipfsHash}`
    );
    return await res.json();
  };

  //Gets credential details and fetch it to CredentialsArr
  const getCredentials = async () => {
    setLoading(true);
    setCredentialsArr([]);
    let data = await contract.getMyKeys();
    const credentialsArr = [];
    //Data is array of credentials object access the object one by one.
    for (let i of data) {
      if (!i.isDeleted) {
        let { ciphertext, dataToEncryptHash } = await fetchCredentials(
          i.ipfsHash
        );
        let decryptedCred = await Lit.decrypt(
          ciphertext,
          dataToEncryptHash,
          accessControlConditions
        );
        let decryptedCredObj = await JSON.parse(decryptedCred.decryptedString);
        credentialsArr.push({ id: Number(BigInt(i.id)), ...decryptedCredObj });
      }
    }
    setCredentialsArr(credentialsArr);
    setLoading(false);
  };

  //Using pinata API to call and store the encrypted credentials in the pinata api.
  const pinFileToIPFS = async (data) => {
    try {
      //Using formdata to upload data to the API.
      const formData = new FormData();
      // API only supports working with File and Blob. Therefore converting the JSON data to blob here.
      const blob = new Blob([JSON.stringify(data)], { type: "text/plain" });
      console.log(blob);
      formData.append("file", blob);
      const options = JSON.stringify({
        cidVersion: 0,
      });
      console.log(formData);
      const res = await fetch(
        `https://${process.env.NEXT_PUBLIC_PINATA_API}/pinning/pinFileToIPFS`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT_KEY}`,
          },
          body: formData,
        }
      );
      //Using post request to send the data to Pinata API.
      const resData = await res.json();
      console.log(resData);
      return resData.IpfsHash;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  // This function is responsible for saving data in the blockchain contract and create the transactions.
  const handleSaveCredentials = async () => {
    setLoading(true);
    console.log(JSON.stringify(credentials));
    // Calling the LIT Protocol defined library to encrypt the credentials.
    let encryptedData = await Lit.encrypt(
      JSON.stringify(credentials),
      accessControlConditions
    );
    const ipfsHash = pinFileToIPFS(encryptedData);
    // Adding the hash to the ethereum network.
    const tx = await contract.addKey(ipfsHash);
    console.log("Add Tx-->", tx.hash);
    await tx.wait();
    await getCredentials();
    setLoading(false);
    setIsAddModalOpen(false);
    setLog({
      type: "info",
      message: "Updated",
      description: "Credentials successfully saved to the network.",
    });
  };

  //Handler function for editing the credentials and updating to the network.
  const handleEditCredentials = async (credential) => {
    setLoading(true);
    let encryptedData = await Lit.encrypt(
      JSON.stringify(credential),
      accessControlConditions
    );
    const ipfsHash = pinFileToIPFS(encryptedData);
    const tx = await contract.updateKey(credential.id, ipfsHash);
    await tx.wait();
    await getCredentials();
    setLoading(false);
    setIsEditModalOpen(false);
    setLog({
      type: "info",
      message: "Saved",
      description: "Updated credentials successfully saved to the network",
    });
  };

  //Handler function for the deletion of the credential from the network.
  const handleDeleteCredentials = async (rowId) => {
    setLoading(true);
    const tx = await contract.deleteKey(rowId);
    await tx.wait();
    setLoading(false);
    await getCredentials();
    setLog({
      type: "info",
      message: "Deleted",
      description: "Credentials deleted from the network.",
    });
  };

  // Handling the Add Modal Input change.
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  //Handling the Edit Modal text input change
  const handleEditingInputChange = (event) => {
    setEditingCredentials({
      ...editingCredentials,
      [event.target.name]: event.target.value,
    });
  };

  //Effect for loading the credentials when the contract is set.
  useEffect(() => {
    if (contract) {
      getCredentials();
    }
  }, [contract]);

  //Effect for handling the notifications once log is set call the notification.
  useEffect(() => {
    if (log) {
      handleNotification(log);
    }
  }, [log]);

  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>DePass - Decentralised Password Manager</title>
  //       <meta
  //         name="description"
  //         content="DePass - Decentralised Password Manager"
  //       />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <main className={styles.main}>
  //       <h3 className={styles.title}>
  //         Welcome to DePass <span> Decentralised Password Manager</span>
  //       </h3>

  //       <p className={styles.description}>
  //         Securely save your credentials over the blockchain network.
  //       </p>

  //       {provider && (
  //         <>
  //           <h2>My Passwords</h2>
  //           <Space>
  //             <Input.Search
  //               placeholder="Search by Ipfs Hash.."
  //               value={searchInput}
  //               enterButton
  //               allowClear
  //               loading={loading}
  //               onSearch={getCredentials}
  //               onChange={(e) => setSearchInput(e.target.value)}
  //             />
  //             <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
  //               Add
  //               <PlusCircleOutlined />
  //             </Button>
  //             <Button type="primary" onClick={getCredentials}>
  //               Refresh
  //               <SyncOutlined />
  //             </Button>
  //             <Button
  //               type="primary"
  //               onClick={() => {
  //                 setCredentials([]);
  //                 setProvider(null);
  //                 setLog({
  //                   type: "info",
  //                   message: "Logged Out",
  //                   description: "You have been successfully logged out",
  //                 });
  //               }}
  //             >
  //               Logout
  //             </Button>
  //           </Space>
  //           <Table
  //             className="table_grid"
  //             columns={columns}
  //             rowKey="id"
  //             dataSource={credentialsArr}
  //             scroll={{ x: 970 }}
  //             loading={loading}
  //             pagination={{
  //               pageSizeOptions: [10, 25, 50, 100],
  //               showSizeChanger: true,
  //               defaultCurrent: 1,
  //               defaultPageSize: 10,
  //               size: "default",
  //             }}
  //             onChange={() => {}}
  //           />
  //         </>
  //       )}
  //       {!provider && (
  //         <Button
  //           type="primary"
  //           onClick={handleConnectWallet}
  //           loading={loading}
  //         >
  //           Connect Wallet
  //         </Button>
  //       )}
  //       <Modal
  //         title="Save Password"
  //         open={isAddModalOpen}
  //         onCancel={() => setIsAddModalOpen(false)}
  //         footer={null}
  //       >
  //         <div className={styles.encryptDecryptContainer}>
  //           <label htmlFor="site">Site</label>
  //           <Input
  //             type="text"
  //             name="site"
  //             placeholder="example.com"
  //             onChange={handleInputChange}
  //           />
  //           <label htmlFor="username">Username</label>
  //           <Input
  //             type="text"
  //             name="username"
  //             placeholder="Username"
  //             onChange={handleInputChange}
  //           />
  //           <label htmlFor="password">Password</label>
  //           <Input.Password
  //             type="password"
  //             name="password"
  //             value={credentials?.password}
  //             placeholder="Password"
  //             onChange={handleInputChange}
  //           />
  //           <Space>
  //             <Button
  //               type="primary"
  //               loading={loading}
  //               onClick={() => handleSaveCredentials(credentials)}
  //             >
  //               Save
  //             </Button>
  //           </Space>
  //         </div>
  //       </Modal>
  //       <Modal
  //         title="Edit Password"
  //         open={isEditModalOpen}
  //         onCancel={() => setIsEditModalOpen(false)}
  //         footer={null}
  //       >
  //         <div className={styles.encryptDecryptContainer}>
  //           <label htmlFor="site">Site</label>
  //           <Input
  //             type="text"
  //             name="site"
  //             value={editingCredentials?.site || ""}
  //             placeholder="example.com"
  //             onChange={handleEditingInputChange}
  //           />
  //           <label htmlFor="username">Username</label>
  //           <Input
  //             type="text"
  //             name="username"
  //             value={editingCredentials?.username || ""}
  //             placeholder="Username"
  //             onChange={handleEditingInputChange}
  //           />
  //           <label htmlFor="password">Password</label>
  //           <Input.Password
  //             type="password"
  //             name="password"
  //             value={editingCredentials?.password || ""}
  //             placeholder="Password"
  //             onChange={handleEditingInputChange}
  //           />
  //           {/* generte random password button */}
  //           <Space>
  //             <Button
  //               type="primary"
  //               loading={loading}
  //               onClick={() => handleEditCredentials(editingCredentials)}
  //             >
  //               Save
  //             </Button>
  //           </Space>
  //         </div>
  //         <p>{logMessage}</p>
  //       </Modal>
  //       <p>{logMessage}</p>
  //     </main>
  //   </div>
  // );

  return (
    <ChakraProvider>
      <Flex
        width={"100vw"}
        height={"100vh"}
        alignContent={"center"}
        justifyContent={"center"}
        bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
      >
        <Center>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="elevated"
            boxShadow="dark-lg"
            p="6"
            rounded="md"
            bg="white"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "300px" }}
              src="blockChain.png"
              alt="Caffe Latte"
            />
            <Stack>
              <CardBody py="10">
                <Heading
                  // style={{ color: "#A370AF" }}
                  //
                  size="xl"
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                >
                  DePass: Decentralised Password Manager
                </Heading>

                <Text
                  py="2"
                  pt="4"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  A blockchain based password manager to securely store your
                  credentials.
                </Text>
                <Center>
                  <Stack pt="5%" direction="row" spacing={4}>
                    <Button
                      // leftIcon={<EmailIcon />}
                      colorScheme="teal"
                      variant="solid"
                      onClick={handleConnectWallet}
                    >
                      Login using MetaMask
                    </Button>
                    <Button
                      // rightIcon={<ArrowForwardIcon />}
                      colorScheme="teal"
                      variant="outline"
                    >
                      Download MetaMask
                    </Button>
                  </Stack>
                </Center>
              </CardBody>
              {/* <CardFooter></CardFooter> */}
            </Stack>
          </Card>
        </Center>
      </Flex>
    </ChakraProvider>
  );
}
