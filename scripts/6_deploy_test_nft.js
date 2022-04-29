const network = hre.network.name;
const {
  TREASURY_ADDRESS,
  AUCTION,
  MARKETPLACE,
  BUNDLE_MARKETPLACE
} = require('./constants');
const fs = require('fs');

async function main() {
  const namesAndAddresses = {};
  const NFTTradableInstance = await ethers.getContractFactory('FantomNFTTradable');
  const NFTTradable = await NFTTradableInstance.deploy(
    'Artion',
    'ART',
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    '10000000000000000000',
    TREASURY_ADDRESS
  );
  await NFTTradable.deployed();
  console.log('FantomNFTTradable deployed to:', NFTTradable.address);

  const NFTTradablePrivateInstance = await ethers.getContractFactory(
    'FantomNFTTradablePrivate'
  );
  const NFTTradablePrivate = await NFTTradablePrivateInstance.deploy(
    'IArtion',
    'IART',
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    '10000000000000000000',
    TREASURY_ADDRESS
  );
  await NFTTradablePrivate.deployed();
  console.log('FantomNFTTradablePrivate deployed to:', NFTTradablePrivate.address);

  namesAndAddresses.NFTTradable = NFTTradable.address;
  namesAndAddresses.NFTTradablePrivate = NFTTradablePrivate.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'NFTTradable_NFTTradablePrivate_' + `${network}.json`;

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
