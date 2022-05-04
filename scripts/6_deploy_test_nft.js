const network = hre.network.name;
const {
  TREASURY_ADDRESS,
  AUCTION,
  MARKETPLACE,
  BUNDLE_MARKETPLACE,
  NFT_TRADABLE_NAME,
  NFT_TRADABLE_SYMBOL,
  NFT_TRADABLE_PLATFORM_FEE,
  NFT_TRADABLE_PRIVATE_NAME,
  NFT_TRADABLE_PRIVATE_SYMBOL,
  NFT_TRADABLE_PRIVATE_PLATFORM_FEE
} = require('./constants');
const fs = require('fs');

async function main() {
  const namesAndAddresses = {};
  const NFTTradableInstance = await ethers.getContractFactory('FantomNFTTradable');
  const NFTTradable = await NFTTradableInstance.deploy(
    NFT_TRADABLE_NAME,
    NFT_TRADABLE_SYMBOL,
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    NFT_TRADABLE_PLATFORM_FEE,
    TREASURY_ADDRESS
  );
  await NFTTradable.deployed();
  console.log('FantomNFTTradable deployed to:', NFTTradable.address);

  const NFTTradablePrivateInstance = await ethers.getContractFactory(
    'FantomNFTTradablePrivate'
  );
  const NFTTradablePrivate = await NFTTradablePrivateInstance.deploy(
    NFT_TRADABLE_PRIVATE_NAME,
    NFT_TRADABLE_PRIVATE_SYMBOL,
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    NFT_TRADABLE_PRIVATE_PLATFORM_FEE,
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
