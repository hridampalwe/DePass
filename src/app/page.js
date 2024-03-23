"use client";
import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import Head from "next/head";
import Lit from "./lib/lit.js";
import {
  Space,
  Button,
  Input,
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
import styles from "./styles/Home.module.css";

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

  //Effect for loading the credentials when the contract is set.
  useEffect(() => {
    if (contract) {
      getCredentials();
    }
  }, [contract]);

  //ACL for the LIT Protocol for stroging the encryption over to the Blockchain.
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
    // setCredentialsArr([]);
    let data = await contract.getMyKeys();
    const credentialsArr = [];
    //Data is array of credentials object access the object one by one.
    for (let i of data) {
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
    await getHashes();
    await getCredentials();
    setLoading(false);
    setIsAddModalOpen(false);
    setLog({
      type: "info",
      message: "Saved",
      description: "Credentials successfully saved to the network",
    });
  };

  // Handling the input change to set the credential variable.
  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  //Effect for handling the notifications once log is set call the notification.
  useEffect(() => {
    if (log) {
      handleNotification(log);
    }
  }, [log]);

  return (
    <div className={styles.container}>
      <Head>
        <title>DePass - Decentralised Password Manager</title>
        <meta
          name="description"
          content="DePass - Decentralised Password Manager"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to DePass <span> Decentralised Password Manager</span>
        </h3>

        <p className={styles.description}>
          Securely save your credentials over the blockchain network.
        </p>

        {provider && (
          <>
            <h2>My Passwords</h2>
            <Space>
              <Input.Search
                placeholder="Search by Ipfs Hash.."
                value={searchInput}
                enterButton
                allowClear
                loading={loading}
                onSearch={getCredentials}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
                Add
                <PlusCircleOutlined />
              </Button>
              <Button type="primary" onClick={getCredentials}>
                Refresh
                <SyncOutlined />
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setCredentials([]);
                  setProvider(null);
                  setLog({
                    type: "info",
                    message: "Logged Out",
                    description: "You have been successfully logged out",
                  });
                }}
              >
                Logout
              </Button>
            </Space>
            <Table
              className="table_grid"
              columns={columns}
              rowKey="id"
              dataSource={credentialsArr}
              scroll={{ x: 970 }}
              loading={loading}
              pagination={{
                pageSizeOptions: [10, 25, 50, 100],
                showSizeChanger: true,
                defaultCurrent: 1,
                defaultPageSize: 10,
                size: "default",
              }}
              onChange={() => {}}
            />
          </>
        )}
        {!provider && (
          <Button
            type="primary"
            onClick={handleConnectWallet}
            loading={loading}
          >
            Connect Wallet
          </Button>
        )}
        <Modal
          title="Save Password"
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          footer={null}
        >
          <div className={styles.encryptDecryptContainer}>
            <label htmlFor="site">Site</label>
            <Input
              type="text"
              name="site"
              placeholder="example.com"
              onChange={handleInputChange}
            />
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password</label>
            <Input.Password
              type="password"
              name="password"
              value={credentials?.password}
              placeholder="Password"
              onChange={handleInputChange}
            />
            <Space>
              <Button
                type="primary"
                loading={loading}
                onClick={() => handleSaveCredentials(credentials)}
              >
                Save
              </Button>
            </Space>
          </div>
          <p>{logMessage}</p>
        </Modal>
      </main>
    </div>
  );
}
