import * as LitJsSdk from "@lit-protocol/lit-node-client";

const client = new LitNodeClient({ debug: false });
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

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    let { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      message
    );
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    });

    return {
      encryptedString: await LitJsSdk.blobToBase64String(encryptedString),
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
        encryptedSymmetricKey,
        "base16"
      ),
    };
  }
  async decrypt(
    encryptedString,
    encryptedSymmetricKey,
    accessControlConditions
  ) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions,
      toDecrypt: encryptedSymmetricKey,
      chain,
      authSig,
    });

    const decryptedString = await LitJsSdk.decryptString(
      LitJsSdk.base64StringToBlob(encryptedString),
      symmetricKey
    );

    return { decryptedString };
  }
}

export default new Lit();
