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

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const abi = [
  "function addKey(string _ipfsHash)",
  "function getMyKeys() view returns (tuple(uint256 id, string ipfsHash)[])",
  "function softDeleteKey(uint256 _id)",
  "function updateKey(uint256 _id, string _ipfsHash)",
];

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [logMessage, setLogMessage] = useState("");
  const [log, setLog] = useState(null);
  const [credentials, setCredentials] = useState({});

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

  //Handle the connection of wallet
  const handleConnectWallet = async () => {
    try {
      if (window?.ethereum) {
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
  const getHashes = async () => {
    let data = await contract.getMyKeys();
    console.log(data);
  };

  const fetchCredentials = async (_ipfsHash) => {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_GATEWAY}/ipfs/${_ipfsHash}`
    );
    console.log(await res.json());
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
  };

  // Handling the input change to set the credential variable.
  const handleInputChange = (event) =>
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

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
          Create, save, and manage your passwords securely in decentralised
          world. so you can easily sign in to sites and apps.
        </p>
        {!provider && (
          <Button type="primary" onClick={handleConnectWallet}>
            Connect Wallet
          </Button>
        )}
        {provider && (
          <>
            <h2>My Passwords</h2>
            <Space>
              <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
                Add
                <PlusCircleOutlined />
              </Button>
            </Space>
          </>
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
