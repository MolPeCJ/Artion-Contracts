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
  const fileName = "artTradable_artTradablePrivate_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.artTradable,
      constructorArguments: [ 
      'FantomArt',
      'FART',
      '20000000000000000000',
      TREASURY_ADDRESS,
      MARKETPLACE,
      BUNDLE_MARKETPLACE],
      contract: "contracts/FantomArtTradable.sol:FantomArtTradable",
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