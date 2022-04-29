const network = hre.network.name;
const fs = require('fs');

async function main() {
  const namesAndAddresses = {};
  const tokenRegistryInstance = await ethers.getContractFactory('FantomTokenRegistry');
  const tokenRegistry = await tokenRegistryInstance.deploy();

  await tokenRegistry.deployed();

  console.log('FantomTokenRegistry deployed to', tokenRegistry.address);

  namesAndAddresses.tokenRegistry = tokenRegistry.address;

  const data = await JSON.stringify(namesAndAddresses, null, 2);
  const dir = './networks/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = 'tokenRegistry_' + `${network}.json`;

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
