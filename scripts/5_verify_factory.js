// npx hardhat run scripts/5_verify_factory.js --network *
const network = hre.network.name;
const fs = require('fs');
const {
  TREASURY_ADDRESS,
  AUCTION,
  MARKETPLACE,
  BUNDLE_MARKETPLACE
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
        '10000000000000000000',
        TREASURY_ADDRESS,
        '50000000000000000000'],
      contract: "contracts/FantomNFTFactory.sol:FantomNFTFactory",
    });
    await hre.run("verify:verify", {
      address: data.NFTFactoryPrivate,
      constructorArguments: [ 
        AUCTION,
        MARKETPLACE,
        BUNDLE_MARKETPLACE,
        '10000000000000000000',
        TREASURY_ADDRESS,
        '50000000000000000000'],
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