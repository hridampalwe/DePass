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
import axios from "axios";

// const fs = require("fs");
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MGI4MmQ5Yi02Yjc5LTQ0Y2UtOWU1Ny1kYjg2NzI5MWQzZWQiLCJlbWFpbCI6InNha3NoaWFncmF3YWwyNDQ1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5NTY2YjIwZWY0NDFjNzdiOWU5NiIsInNjb3BlZEtleVNlY3JldCI6IjFlZDVjNTVmNTAyMjM0OTI4N2I4N2MyMDA2MmE2MGNkZTY2M2IzOWViZjJkMzk0YWEzZjcyYzYzYTJiZWE4NWIiLCJpYXQiOjE3MTEwNDMyMzN9.aIpTM2c-Vn0c-iWb0ssV8TNWXkk-jrtkm8NwMjOkUSU";

const contractAddress = "0xa142e36c33801dd7ffad962ca44ea98ddda3f3fe";
const abi = [
  "function addKey(string _ipfsHash)",
  "function getMyKeys() view returns (tuple(uint256 id, string ipfsHash, bool isDeleted)[])",
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
  const pinFileToIPFS = async (data) => {
    const formData = new FormData();
    const src = JSON.stringify(data);

    // const pinataMetadata = JSON.stringify({
    //   name: "File name",
    // });
    // formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    // formData.append("pinataOptions", pinataOptions);

    // try {
    //   const res = await axios.post(
    //     "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //     formData,
    //     {
    //       maxBodyLength: "Infinity",
    //       headers: {
    //         "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    //         Authorization: `Bearer ${JWT}`,
    //       },
    //     }
    //   );
    try {
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
          body: src,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveCredentials = async () => {
    // const tx = await contract.addKey(credentials);
    // console.log("Add Tx-->", tx.hash);
    // setLog({
    //   type: "info",
    //   message: "Transaction submitted. Waiting for confirmation.",
    //   description: tx.hash,
    // });
    // await tx.wait();
    // setLog({
    //   type: "success",
    //   message: "Credentials saved successfully",
    //   description: "Refreshes in 20 seconds..",
    // });
    // setIsAddModalOpen(false);
    // setLoading(false);
    console.log(JSON.stringify(credentials).toString());
    let encryptedData = await Lit.encrypt(
      JSON.stringify(credentials),
      accessControlConditions
    );

    // let { decryptedString } = await Lit.decrypt(
    //   ciphertext,
    //   dataToEncryptHash,
    //   accessControlConditions
    // );
    pinFileToIPFS(encryptedData);
  };
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
