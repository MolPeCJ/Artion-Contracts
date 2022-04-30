const network = hre.network.name;
const fs = require('fs');
const {
  TREASURY_ADDRESS,
  AUCTION,
  MARKETPLACE,
  BUNDLE_MARKETPLACE
} = require('./constants');

async function main() {
  const namesAndAddresses = {};
  const NFTFactoryInstance = await ethers.getContractFactory('FantomNFTFactory');
  const NFTFactory = await NFTFactoryInstance.deploy(
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    '10000000000000000000',
    TREASURY_ADDRESS,
    '50000000000000000000'
  );
  await NFTFactory.deployed();
  console.log('FantomNFTFactory deployed to:', NFTFactory.address);

  const NFTFactoryPrivateInstance = await ethers.getContractFactory(
    'FantomNFTFactoryPrivate'
  );
  const NFTFactoryPrivate = await NFTFactoryPrivateInstance.deploy(
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    '10000000000000000000',
    TREASURY_ADDRESS,
    '50000000000000000000'
  );
  await NFTFactoryPrivate.deployed();
  console.log('FantomNFTFactoryPrivate deployed to:', NFTFactoryPrivate.address);

  namesAndAddresses.NFTFactory = NFTFactory.address;
  namesAndAddresses.NFTFactoryPrivate = NFTFactoryPrivate.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'NFTFactory_NFTFactoryPrivate_' + `${network}.json`;

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
