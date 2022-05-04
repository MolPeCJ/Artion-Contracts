// npx hardhat run scripts/6_verify_test_nft.js --network *
const network = hre.network.name;
const fs = require("fs");
const {
    TREASURY_ADDRESS,
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    NFT_TRADABLE_NAME,
    NFT_TRADABLE_SYMBOL,
    NFT_TRADABLE_PLATFORM_FEE,
    NFT_TRADABLE_PRIVATE_NAME,
    NFT_TRADABLE_PRIVATE_SYMBOL,
    NFT_TRADABLE_PRIVATE_PLATFORM_FEE
  } = require('./constants');

async function main() {
  const dir = "./networks/";
  const fileName = "NFTTradable_NFTTradablePrivate_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.NFTTradable,
      constructorArguments: [ 
      NFT_TRADABLE_NAME,
      NFT_TRADABLE_SYMBOL,
      AUCTION,
      MARKETPLACE,
      BUNDLE_MARKETPLACE,
      NFT_TRADABLE_PLATFORM_FEE,
      TREASURY_ADDRESS],
      contract: "contracts/FantomNFTTradable.sol:FantomNFTTradable",
    });
    await hre.run("verify:verify", {
      address: data.NFTTradablePrivate,
      constructorArguments: [
      NFT_TRADABLE_PRIVATE_NAME,
      NFT_TRADABLE_PRIVATE_SYMBOL,
      AUCTION,
      MARKETPLACE,
      BUNDLE_MARKETPLACE,
      NFT_TRADABLE_PRIVATE_PLATFORM_FEE,
      TREASURY_ADDRESS],
      contract: "contracts/FantomNFTTradablePrivate.sol:FantomNFTTradablePrivate",
    });
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });