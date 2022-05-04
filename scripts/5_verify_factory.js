// npx hardhat run scripts/5_verify_factory.js --network *
const network = hre.network.name;
const fs = require('fs');
const {
  TREASURY_ADDRESS,
  AUCTION,
  MARKETPLACE,
  BUNDLE_MARKETPLACE,
  NFT_FACTORY_MINT_FEE, 
  NFT_FACTORY_PLATFORM_FEE, 
  NFT_FACTORY_PRIVATE_MINT_FEE, 
  NFT_FACTORY_PRIVATE_PLATFORM_FEE
} = require('./constants');

async function main() {
  const dir = "./networks/";
  const fileName = "NFTFactory_NFTFactoryPrivate_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.NFTFactory,
      constructorArguments: [ 
        AUCTION,
        MARKETPLACE,
        BUNDLE_MARKETPLACE,
        NFT_FACTORY_MINT_FEE,
        TREASURY_ADDRESS,
        NFT_FACTORY_PLATFORM_FEE],
      contract: "contracts/FantomNFTFactory.sol:FantomNFTFactory",
    });
    await hre.run("verify:verify", {
      address: data.NFTFactoryPrivate,
      constructorArguments: [ 
        AUCTION,
        MARKETPLACE,
        BUNDLE_MARKETPLACE,
        NFT_FACTORY_PRIVATE_MINT_FEE,
        TREASURY_ADDRESS,
        NFT_FACTORY_PRIVATE_PLATFORM_FEE],
      contract: "contracts/FantomNFTFactoryPrivate.sol:FantomNFTFactoryPrivate",
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