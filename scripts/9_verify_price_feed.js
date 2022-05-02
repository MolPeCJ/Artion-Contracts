// npx hardhat run scripts/9_verify_price_feed.js --network *
const network = hre.network.name;
const fs = require("fs");
const {
    FANTOM_ADDRESS_REGISTRY,
    WRAPPED_FTM_MAINNET,
    WRAPPED_FTM_TESTNET
  } = require('./constants');

async function main() {
  const dir = "./networks/";
  const fileName = "priceFeed_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.priceFeed,
      constructorArguments: [FANTOM_ADDRESS_REGISTRY,
        //WRAPPED_FTM_MAINNET
        WRAPPED_FTM_TESTNET],
      contract: "contracts/FantomPriceFeed.sol:FantomPriceFeed",
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