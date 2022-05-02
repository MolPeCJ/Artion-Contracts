const network = hre.network.name;
const fs = require('fs');
const {
  TREASURY_ADDRESS,
  PROXY_ADDRESS_TESTNET,
  PROXY_ADDRESS_MAINNET
} = require('./constants');

async function main() {
  const namesAndAddresses = {};
  const Auction = await ethers.getContractFactory('FantomAuction');
  const auctionImpl = await Auction.deploy();
  await auctionImpl.deployed();
  console.log('FantomAuction deployed to:', auctionImpl.address);

  // const AdminUpgradeabilityProxyFactory = await ethers.getContractFactory(
  //   'AdminUpgradeabilityProxy'
  // );

  // // Mainnet
  // const auctionProxy = await AdminUpgradeabilityProxyFactory.deploy(
  //   auctionImpl.address,
  //   PROXY_ADDRESS_MAINNET,
  //   []
  // );

  // // Testnet
  // // const auctionProxy = await AdminUpgradeabilityProxyFactory.deploy(
  // //   auctionImpl.address,
  // //   PROXY_ADDRESS_TESTNET,
  // //   []
  // // );

  // await auctionProxy.deployed();
  // console.log('Auction Proxy deployed at ', auctionProxy.address);

  // const auction = await ethers.getContractAt(
  //   'FantomAuction',
  //   auctionProxy.address
  // );
  // await auction.initialize(TREASURY_ADDRESS);
  // console.log('Auction Proxy initialized');

  namesAndAddresses.auctionImpl = auctionImpl.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'auction_' + `${network}.json`;

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
