const network = hre.network.name;
const fs = require('fs');
const {
  TREASURY_ADDRESS,
  MARKETPLACE,
  BUNDLE_MARKETPLACE,
  ART_TRADABLE_NAME,
  ART_TRADABLE_SYMBOL,
  ART_TRADABLE_PLATFORM_FEE,
  ART_TRADABLE_PRIVATE_NAME,
  ART_TRADABLE_PRIVATE_SYMBOL,
  ART_TRADABLE_PRIVATE_PLATFORM_FEE
} = require('./constants');

async function main() {
  const namesAndAddresses = {};
  const artTradableInstance = await ethers.getContractFactory('FantomArtTradable');
  const artTradable = await artTradableInstance.deploy(
    ART_TRADABLE_NAME,
    ART_TRADABLE_SYMBOL,
    ART_TRADABLE_PLATFORM_FEE,
    TREASURY_ADDRESS,
    MARKETPLACE,
    BUNDLE_MARKETPLACE
  );
  await artTradable.deployed();
  console.log('FantomArtTradable deployed to:', artTradable.address);

  const artTradablePrivateInstance = await ethers.getContractFactory(
    'FantomArtTradablePrivate'
  );
  const artTradablePrivate = await artTradablePrivateInstance.deploy(
    ART_TRADABLE_PRIVATE_NAME,
    ART_TRADABLE_PRIVATE_SYMBOL,
    ART_TRADABLE_PRIVATE_PLATFORM_FEE,
    TREASURY_ADDRESS,
    MARKETPLACE,
    BUNDLE_MARKETPLACE
  );
  await artTradablePrivate.deployed();
  console.log('FantomArtTradablePrivate deployed to:', artTradablePrivate.address);

  namesAndAddresses.artTradable = artTradable.address;
  namesAndAddresses.artTradablePrivate = artTradablePrivate.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'artTradable_artTradablePrivate_' + `${network}.json`;

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
