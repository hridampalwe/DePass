// import {
//   LitNodeClient,
//   checkAndSignAuthMessage,
//   decryptToString,
//   encryptString,
// } from "@lit-proto";
// //  LitJsSdk from "@lit-protocol/lit-node-client";
import {
  LitNodeClient,
  checkAndSignAuthMessage,
  decryptToString,
  encryptString,
} from "@lit-protocol/lit-node-client";

const client = new LitNodeClient();
const chain = "ethereum";

class Lit {
  litNodeClient;

  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }
  async encrypt(message, accessControlConditions) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await checkAndSignAuthMessage({ chain });
    const { ciphertext, dataToEncryptHash } = await encryptString(
      {
        accessControlConditions,
        authSig,
        chain: "ethereum",
        dataToEncrypt: message,
      },
      litNodeClient
    );

    return {
      ciphertext,
      dataToEncryptHash,
    };
  }
  async decrypt(ciphertext, dataToEncryptHash, accessControlConditions) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await checkAndSignAuthMessage({
      chain: "ethereum",
    });
    const decryptedString = await decryptToString(
      {
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig,
        chain: "ethereum",
      },
      litNodeClient
    );
    return { decryptedString };
  }
}

export default new Lit();
