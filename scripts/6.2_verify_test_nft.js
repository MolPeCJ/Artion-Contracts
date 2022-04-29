// npx hardhat run scripts/1_verify_nft.js --network *
const network = hre.network.name;
const fs = require("fs");
const {
    TREASURY_ADDRESS,
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE
  } = require('./constants');

async function main() {
  const dir = "./networks/";
  const fileName = "NFTTradable_NFTTradablePrivate_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.NFTTradablePrivate,
      constructorArguments: [
      'IArtion',
      'IART',
      AUCTION,
      MARKETPLACE,
      BUNDLE_MARKETPLACE,
      '10000000000000000000',
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