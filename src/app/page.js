"use client";
import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { useRouter } from "next/navigation";

// import Head from "next/head";
import Lit from "./lib/lit.js";
import { notification } from "antd";

import { ChakraProvider, Button } from "@chakra-ui/react";
import Login from "./Login.js";
import Dashboard from "./Dashboard.js";

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
];

export default function Home() {
  const router = useRouter();
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [credentialsSitesArr, setCredentialsSitesArr] = useState([]);
  const [credentialsCardsArr, setCredentialsCardsArr] = useState([]);
  const [credentialsNotesArr, setCredentialsNotesArr] = useState([]);
  const [credentialsIdentitiesArr, setCredentialsIdentitiesArr] = useState([]);
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
  const getCredentials = async (credentialsType) => {
    setLoading(true);
    // setCredentialsArr([]);
    let data = await contract.getMyKeys();
    // console.log(data);
    const credentialsArr = [];
    // const credentialsCardsArr = [];
    // const credentialsNotesArr = [];
    // const credentialsIdentitiesArr = [];
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
        // switch (credentialsType) {
        //   case "Sites":
        //     credentialsSitesArr.push({
        //       id: Number(BigInt(i.id)),
        //       ...decryptedCredObj,
        //     });
        //     break;
        //   case "Cards":
        //     credentialsCardsArr.push({
        //       id: Number(BigInt(i.id)),
        //       ...decryptedCredObj,
        //     });
        //     break;
        //   case "Notes":
        //     credentialsNotesArr.push({
        //       id: Number(BigInt(i.id)),
        //       ...decryptedCredObj,
        //     });
        //     break;
        //   case "Identities":
        //     credentialsIdentitiesArr.push({
        //       id: Number(BigInt(i.id)),
        //       ...decryptedCredObj,
        //     });
        //     break;
        //   default:
        //     console.log("Error");
        // }
      }
    }
    // setCredentialsSitesArr(credentialsSitesArr);
    // setCredentialsCardsArr(credentialsCardsArr);
    // setCredentialsNotesArr(credentialsNotesArr);
    // setCredentialsIdentitiesArr(credentialsIdentitiesArr);
    // console.log(credentialsArr);
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
  const handleSaveCredentials = async (credentials, credentialsType) => {
    console.log(credentials);
    console.log(JSON.stringify(credentials));
    // Calling the LIT Protocol defined library to encrypt the credentials.
    let encryptedData = await Lit.encrypt(
      JSON.stringify(credentials),
      accessControlConditions
    );
    const ipfsHash = pinFileToIPFS(encryptedData);
    // Adding the hash to the ethereum network.
    const tx = await contract.addKey(ipfsHash, credentialsType);
    console.log("Add Tx-->", tx.hash);
    console.log(ipfsHash);
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
    console.log(credential);
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
  // useEffect(() => {
  //   if (contract) {
  //     getCredentials();
  //   }
  // }, [contract]);

  //Effect for handling the notifications once log is set call the notification.
  useEffect(() => {
    if (log) {
      handleNotification(log);
    }
  }, [log]);

  function handleLogout(){
    setProvider(null);
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
            handleLogout
          }}
        />
      )}
    </ChakraProvider>
  );
}
