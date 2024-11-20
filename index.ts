import { ApiPromise, WsProvider } from "@polkadot/api";
import { createClient } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider/node";
import { getExtrinsicDecoder, getPjsTxHelper } from "@polkadot-api/tx-utils";

const WITH_CHOPSTICKS = true; // set to true after running `bun chopsticks`
const RPC_URL = WITH_CHOPSTICKS
  ? "ws://localhost:3421"
  : "wss://polkadot-asset-hub-rpc.polkadot.io";

const provider = new WsProvider(RPC_URL);

const pjsApi = await ApiPromise.create({ provider });
await pjsApi.isReady;

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

const extrinsicPayload = pjsApi.registry.createType(
  "ExtrinsicPayload",
  payload
);

console.log("assetId from JSON payload:", payload.assetId);
console.log("assetId from parsed payload:", extrinsicPayload.assetId.toJSON());

await pjsApi.disconnect();

const wsProvider = getWsProvider(RPC_URL);
const client = createClient(wsProvider);

const papi = client.getUnsafeApi();
const binMetadata = await papi.apis.Metadata.metadata_at_version(14);

const pjsTxHelper = getPjsTxHelper(binMetadata.asBytes());
const res = pjsTxHelper(payload as any);

console.log(res);
