require('dotenv').config();
const network = hre.network.name;
const fs = require('fs');
const {
  TREASURY_ADDRESS,
  PLATFORM_FEE,
  PROXY_ADDRESS_TESTNET,
  PROXY_ADDRESS_MAINNET
} = require('./constants');

async function main() {
  const namesAndAddresses = {};
  const Marketplace = await ethers.getContractFactory(
    'FantomBundleMarketplace'
  );
  const marketplaceImpl = await Marketplace.deploy();
  await marketplaceImpl.deployed();
  console.log('FantomBundleMarketplace deployed to:', marketplaceImpl.address);

  const AdminUpgradeabilityProxyFactory = await ethers.getContractFactory(
    'AdminUpgradeabilityProxy'
  );

  // Mainnet
  //const marketplaceProxy = await AdminUpgradeabilityProxyFactory.deploy(
  //  marketplaceImpl.address,
  //  PROXY_ADDRESS_MAINNET,
  //  []
  //);

  // Testnet
  const marketplaceProxy = await AdminUpgradeabilityProxyFactory.deploy(
    marketplaceImpl.address,
    PROXY_ADDRESS_TESTNET,
    []
  );

  await marketplaceProxy.deployed();
  console.log(
    'Bundle Marketplace Proxy deployed at ',
    marketplaceProxy.address
  );

  const marketplace = await ethers.getContractAt(
    'FantomBundleMarketplace',
    marketplaceProxy.address
  );
  await marketplace.initialize(TREASURY_ADDRESS, PLATFORM_FEE);
  console.log('Bundle Marketplace Proxy initialized');

  namesAndAddresses.marketplaceImpl = marketplaceImpl.address;
  namesAndAddresses.marketplaceProxy = marketplaceProxy.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'bundleMarketplace_bundleMarketplaceProxy_' + `${network}.json`;

  await fs.writeFileSync(dir + fileName, data, { encoding: 'utf8' });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
