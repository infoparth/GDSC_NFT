import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

const RPC_URL = process.env.RPC_URL || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000,
      },
    },
  },

  networks: {
    polygon_mainnet: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    polygon_mumbai: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};

export default config;
