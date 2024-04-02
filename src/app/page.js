"use client";

import { ChakraProvider, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Contract } from "@ethersproject/contracts";
import Dashboard from "./Dashboard.js";
import Lit from "./lib/lit.js";
import Login from "./Login.js";
import Web3 from "web3";
import { Web3Provider } from "@ethersproject/providers";

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
      {
        internalType: "string",
        name: "_credentialType",
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
            name: "credentialType",
            type: "string",
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
  {
    inputs: [],
    name: "getCredId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export default function Home() {
  const toast = useToast();
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [log, setLog] = useState(null);

  //Function to use AntD notifications and set message and description
  const handleNotification = ({ type, message, description }) => {
    toast({
      title: `${message}`,
      status: type,
      description: description,
      isClosable: true,
      position: "top",
    });
    setLog(null);
  };

  //ACC for the LIT Protocol for stroging the encryption over to the Blockchain.
  const accessControlConditions = [
    {
      contractAddress: "",
      standardContractType: "",
      chain: "mumbai",
      method: "",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: "=",
        value: account,
      },
    },
  ];

  const connectionInfo = async () => {
    const web3 = new Web3(window.ethereum);
    const chainId = await web3.eth.getChainId();
    const balance = await web3.eth.getBalance(account);
    const count = await web3.eth.getTransactionCount(account);
    return {
      account,
      contractAddress,
      chainId,
      balance,
      count,
    };
  };

  //Handle the connection of wallet through meta mask account.
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
        setLog({
          type: "info",
          message: "Connected",
          description: "Wallet Connected Successfully",
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

  //Fetch Credentials from pinata through the IPFS Hash.
  const fetchCredentials = async (_ipfsHash) => {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_GATEWAY}/ipfs/${_ipfsHash}`
    );
    return await res.json();
  };

  //Gets credential details and fetch it to CredentialsArr
  const getCredentials = async (credentialsType) => {
    let data = await contract.getMyKeys();
    const credentialsArr = [];
    //Data is array of credentials object access the object one by one.
    for (let i of data) {
      if (!i.isDeleted && i.credentialType === credentialsType) {
        let { ciphertext, dataToEncryptHash } = await fetchCredentials(
          i.ipfsHash
        );
        let decryptedCred = await Lit.decrypt(
          ciphertext,
          dataToEncryptHash,
          accessControlConditions
        );
        let decryptedCredObj = await JSON.parse(decryptedCred.decryptedString);
        credentialsArr.push({
          id: Number(BigInt(i.id)),
          ...decryptedCredObj,
        });
      }
    }
    return credentialsArr;
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
    }
  };

  // This function is responsible for saving data in the blockchain contract and create the transactions.
  const handleSaveCredentials = async (credentials, credentialsType) => {
    // Calling the LIT Protocol defined library to encrypt the credentials.
    let encryptedData = await Lit.encrypt(
      JSON.stringify(credentials),
      accessControlConditions
    );
    const ipfsHash = pinFileToIPFS(encryptedData);
    // Adding the hash to the ethereum network.
    try {
      let tx = await contract.addKey(ipfsHash, credentialsType);
      console.log("Add Tx-->", tx.hash);
      console.log(ipfsHash);
      await tx.wait();
    } catch (error) {
      setLog({
        type: "error",
        message: "Failed",
        description: "Transaction rejected",
      });
      return -1;
    }
    let credId = await contract.getCredId();
    setLog({
      type: "success",
      message: "Updated",
      description: "Credentials saved successfully to the network.",
    });
    credId = Number(BigInt(credId));
    console.log(credId);
    return credId;
  };

  //Handler function for editing the credentials and updating to the network.
  const handleEditCredentials = async (credential) => {
    let encryptedData = await Lit.encrypt(
      JSON.stringify(credential),
      accessControlConditions
    );
    console.log(credential.id);
    const ipfsHash = pinFileToIPFS(encryptedData);
    try {
      const tx = await contract.updateKey(credential.id, ipfsHash);
      await tx.wait();
      setLog({
        type: "success",
        message: "Saved",
        description: "Updated successfully credentials saved to the network",
      });
    } catch (error) {
      setLog({
        type: "error",
        message: "Failed",
        description: "Transaction was rejected",
      });
      return false;
    }
    return true;
  };

  //Handler function for the deletion of the credential from the network.
  const handleDeleteCredentials = async (rowId) => {
    try {
      const tx = await contract.deleteKey(rowId);
      await tx.wait();
      setLog({
        type: "success",
        message: "Deleted",
        description: "Credentials deleted successfully from the network.",
      });
    } catch (error) {
      setLog({
        type: "error",
        message: "Failed",
        description: "Transaction was rejected",
      });
      return false;
    }
    return true;
  };

  //Effect for handling the notifications once log is set call the notification.
  useEffect(() => {
    if (log) {
      handleNotification(log);
    }
  }, [log]);

  function handleLogout() {
    setProvider(null);
    setLog({
      type: "success",
      message: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }

  return (
    <ChakraProvider>
      {!provider && <Login handleConnectWallet={handleConnectWallet} />}
      {provider && (
        <Dashboard
          functions={{
            handleSaveCredentials,
            getCredentials,
            handleEditCredentials,
            handleDeleteCredentials,
            handleLogout,
            connectionInfo,
          }}
        />
      )}
    </ChakraProvider>
  );
}
