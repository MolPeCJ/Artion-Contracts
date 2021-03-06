// npx hardhat run scripts/11_verify_1155_factory.js --network *
const network = hre.network.name;
const fs = require('fs');
const {
  TREASURY_ADDRESS,
  MARKETPLACE,
  BUNDLE_MARKETPLACE,
  ART_FACTORY_MINT_FEE,
  ART_FACTORY_PLATFORM_FEE,
  ART_FACTORY_PRIVATE_MINT_FEE,
  ART_FACTORY_PRIVATE_PLATFORM_FEE
} = require('./constants');

async function main() {
  const dir = "./networks/";
  const fileName = "artFactory_artFactoryPrivate_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.artFactory,
      constructorArguments: [
        MARKETPLACE,
        BUNDLE_MARKETPLACE,
        ART_FACTORY_MINT_FEE,
        TREASURY_ADDRESS,
        ART_FACTORY_PLATFORM_FEE],
      contract: "contracts/FantomArtFactory.sol:FantomArtFactory",
    });
    await hre.run("verify:verify", {
      address: data.artFactoryPrivate,
      constructorArguments: [
        MARKETPLACE,
        BUNDLE_MARKETPLACE,
        ART_FACTORY_PRIVATE_MINT_FEE,
        TREASURY_ADDRESS,
        ART_FACTORY_PRIVATE_PLATFORM_FEE],
      contract: "contracts/FantomArtFactoryPrivate.sol:FantomArtFactoryPrivate",
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