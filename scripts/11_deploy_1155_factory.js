const network = hre.network.name;
const fs = require('fs');
const {
  TREASURY_ADDRESS,
  MARKETPLACE,
  BUNDLE_MARKETPLACE
} = require('./constants');

async function main() {
  const namesAndAddresses = {};
  const artFactoryInstance = await ethers.getContractFactory('FantomArtFactory');
  const artFactory = await artFactoryInstance.deploy(
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    '20000000000000000000',
    TREASURY_ADDRESS,
    '10000000000000000000'
  );
  await artFactory.deployed();
  console.log('FantomArtFactory deployed to:', artFactory.address);

  const artFactoryPrivateInstance = await ethers.getContractFactory(
    'FantomArtFactoryPrivate'
  );
  const artFactoryPrivate = await artFactoryPrivateInstance.deploy(
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    '20000000000000000000',
    TREASURY_ADDRESS,
    '10000000000000000000'
  );
  await artFactoryPrivate.deployed();
  console.log('FantomArtFactoryPrivate deployed to:', artFactoryPrivate.address);

  namesAndAddresses.artFactory = artFactory.address;
  namesAndAddresses.artFactoryPrivate = artFactoryPrivate.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'artFactory_artFactoryPrivate_' + `${network}.json`;

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
