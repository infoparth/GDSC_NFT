import { expect } from "chai";
import { ethers } from "hardhat";
import { NFT } from "../typechain-types/contracts/NFT"; // Update the path based on your project structure

describe("mortgageNFT", function () {
  let mortgageNFT: NFT;
  let owner: any; // You might want to declare the specific type of the signer (e.g., Signer) here
  let addr1: any; // Declare the specific type of the signer here

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const MortgageNFT = await ethers.getContractFactory("NFT");
    mortgageNFT = (await MortgageNFT.deploy(
      "MortgageNFT",
      "MNFT",
      owner.address
    )) as NFT;

    // Mint an NFT for testing purposes
    await mortgageNFT._mintNFT(addr1.address, "tokenURI");
  });

  describe("Deployment", function () {
    it("Should set the correct name, symbol, and owner", async function () {
      expect(await mortgageNFT.name()).to.equal("MortgageNFT");
      expect(await mortgageNFT.symbol()).to.equal("MNFT");
      expect(await mortgageNFT.owner()).to.equal(owner.address);
    });
  });

  describe("Minting NFTs", function () {
    it("Should mint a new NFT with the correct token URI and mortgage amount", async function () {
      const tokenURI = "newTokenURI";

      await mortgageNFT.connect(owner)._mintNFT(addr1.address, tokenURI);

      const tokenId = 1; // assuming this is the second minted token
      expect(await mortgageNFT.tokenURI(tokenId)).to.equal(tokenURI);
    });
  });

  describe("Transferring NFTs", function () {
    it("Should transfer NFT and update mortgage state if mortgage exists", async function () {
      const tokenId = 0; // the first minted token

      await mortgageNFT.connect(addr1).transfer(owner.address, tokenId);

      expect(await mortgageNFT.ownerOf(tokenId)).to.equal(owner.address);
    });

    it("Should transfer NFT without updating mortgage state if mortgage doesn't exist", async function () {
      const tokenId = 0; // the second minted token (assuming it wasn't mortgaged)

      await mortgageNFT.connect(addr1).transfer(owner.address, tokenId);

      expect(await mortgageNFT.ownerOf(tokenId)).to.equal(owner.address);
    });
  });

  describe("Mortgage-related functionalities", function () {
    it("Should update mortgage state and total amount when mortgage is paid", async function () {
      const tokenId = 0; // the first minted token
      const mortgageAmount = ethers.parseEther("1");

      await mortgageNFT.connect(addr1).transfer(owner.address, tokenId); // Transfer the NFT

      await mortgageNFT.connect(owner)._mintNFT(addr1.address, "newTokenURI"); // Mint a new NFT
    });
  });

  describe("Total Mortgage Amount", function () {
    it("Should initialize totalMortgageAmount to zero", async function () {
      // Your test logic goes here
    });

    it("Should correctly update totalMortgageAmount on minting", async function () {
      const mortgageAmount = ethers.parseEther("2");

      await mortgageNFT.connect(owner)._mintNFT(addr1.address, "newTokenURI");
    });

    it("Should correctly update totalMortgageAmount on transfer and mortgage payment", async function () {
      const tokenId = 0; // the first minted token
      const mortgageAmount = ethers.parseEther("1");

      await mortgageNFT.connect(addr1).transfer(owner.address, tokenId); // Transfer the NFT
      await mortgageNFT.connect(owner)._mintNFT(addr1.address, "newTokenURI"); // Mint a new NFT
    });
  });

  describe("NFT To Value Mapping", function () {
    // Your test cases go here
  });
});
