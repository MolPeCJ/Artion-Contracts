const network = hre.network.name;
const fs = require('fs');
const { TREASURY_ADDRESS } = require('./constants');

async function main() {
  const namesAndAddresses = {};
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  console.log('Deploying nft with address:', deployerAddress);

  const ArtionInstance = await ethers.getContractFactory('Artion');
  const Artion = await ArtionInstance.deploy(TREASURY_ADDRESS, '2000000000000000000');

  await Artion.deployed();

  console.log('FantomArtion deployed at', Artion.address);

  namesAndAddresses.Artion = Artion.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'Artion_' + `${network}.json`;

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
