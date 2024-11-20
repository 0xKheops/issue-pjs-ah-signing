import { ApiPromise, WsProvider } from "@polkadot/api";

// run `bun chopsticks` to make this endpoint available
// const provider = new WsProvider("ws://localhost:3421");

const provider = new WsProvider("wss://polkadot-asset-hub-rpc.polkadot.io");

const api = await ApiPromise.create({ provider });
await api.isReady;

const payload = {
  signedExtensions: [
    "CheckNonZeroSender",
    "CheckSpecVersion",
    "CheckTxVersion",
    "CheckGenesis",
    "CheckMortality",
    "CheckNonce",
    "CheckWeight",
    "ChargeAssetTxPayment",
    "CheckMetadataHash",
  ],
  specVersion: "0x000f4dfc",
  transactionVersion: "0x0000000f",
  genesisHash:
    "0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f",
  era: "0xb500",
  blockHash:
    "0x2c2f14bfddd3cd2069e1d5b5f1a78944d772f1049e65b68d8b48e1d60833226b",
  blockNumber: "0x0073e74b",
  nonce: "0x0000004d",
  assetId: "0x0002043205011f",
  tip: "0x00000000000000000000000000000000",
  address: "5CcU6DRpocLUWYJHuNLjB4gGyHJrkWuruQD5XFbRYffCfSAP",
  method:
    "0x0a0300aeedb1738fb7133da240213ab0f0916eb7abaf4140693b7a3f54311732bdda330284d717",
  version: 4,
  withSignedTransaction: true,
};

const extrinsicPayload = api.registry.createType("ExtrinsicPayload", payload);

console.log("assetId from JSON payload:", payload.assetId);
console.log("assetId from parsed payload:", extrinsicPayload.assetId.toJSON());

await api.disconnect();
process.exit(0);
