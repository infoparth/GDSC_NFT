import { ethers } from "hardhat";
import { COLLECTION_NAME, COLLECTION_SYMBOL, OWNER_ADDRESS } from "../helper";

async function main() {
  const _mortgageNFT = await ethers.deployContract("NFT", [
    COLLECTION_NAME,
    COLLECTION_SYMBOL,
    OWNER_ADDRESS,
  ]);

  console.log(`Deploying the contract`);

  // await _mortgageNFT.waitForDeployment();

  console.log(`Deployed to ${await _mortgageNFT.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
