const network = hre.network.name;
const fs = require('fs');

async function main() {
  const namesAndAddresses = {};
  const addressRegistryInstance = await ethers.getContractFactory('FantomAddressRegistry');
  const addressRegistry = await addressRegistryInstance.deploy();

  await addressRegistry.deployed();

  console.log('FantomAddressRegistry deployed to', addressRegistry.address);

  namesAndAddresses.addressRegistry = addressRegistry.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'addressRegistry_' + `${network}.json`;

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
