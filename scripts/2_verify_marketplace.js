// npx hardhat run scripts/2.1_verify_marketplace.js --network *
const network = hre.network.name;
const fs = require('fs');

async function main() {
  const dir = "./networks/";
  const fileName = "proxyAdmin_marketplace_marketplaceProxy_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.proxyAdmin,
      contract: "contracts/proxy/ProxyAdmin.sol:ProxyAdmin",
    });
    await hre.run("verify:verify", {
      address: data.marketplaceImpl,
      contract: "contracts/FantomMarketplace.sol:FantomMarketplace",
    });
    await hre.run("verify:verify", {
      address: data.marketplaceProxy,
      constructorArguments: [data.marketplaceImpl, data.proxyAdmin, []],
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