const network = hre.network.name;
const fs = require('fs');
const {
  FANTOM_ADDRESS_REGISTRY,
  WRAPPED_FTM_MAINNET,
  WRAPPED_FTM_TESTNET
} = require('./constants');

async function main() {
  const namesAndAddresses = {};
  const priceFeedInstance = await ethers.getContractFactory('FantomPriceFeed');
  const priceFeed = await priceFeedInstance.deploy(
    FANTOM_ADDRESS_REGISTRY,
    //WRAPPED_FTM_MAINNET
    WRAPPED_FTM_TESTNET
  );

  await priceFeed.deployed();

  console.log('FantomPriceFeed deployed to', priceFeed.address);

  namesAndAddresses.priceFeed = priceFeed.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'priceFeed_' + `${network}.json`;

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
