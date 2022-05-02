// npx hardhat run scripts/3_verify_bundle_marketplace.js --network *
require('dotenv').config();
const network = hre.network.name;
const fs = require('fs');
const {
  PROXY_ADDRESS_TESTNET,
  PROXY_ADDRESS_MAINNET
} = require('./constants');


async function main() {
  const dir = "./networks/";
  const fileName = "bundleMarketplace_bundleMarketplaceProxy_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.marketplaceImpl,
      contract: "contracts/FantomBundleMarketplace.sol:FantomBundleMarketplace",
    });
    await hre.run("verify:verify", {
      address: data.marketplaceProxy,
      constructorArguments: [data.marketplaceImpl, PROXY_ADDRESS_TESTNET, []], // or data.PROXY_ADDRESS_MAINNET
      contract: "contracts/proxy/AdminUpgradeabilityProxy.sol:AdminUpgradeabilityProxy",
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