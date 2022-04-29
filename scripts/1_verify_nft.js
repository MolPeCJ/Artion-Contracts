// npx hardhat run scripts/1_verify_nft.js --network *
const network = hre.network.name;
const fs = require("fs");
const { TREASURY_ADDRESS } = require('./constants');

async function main() {
  const dir = "./networks/";
  const fileName = "Artion_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.Artion,
      constructorArguments: [TREASURY_ADDRESS, '2000000000000000000'],
      contract: "contracts/FantomArtion.sol:Artion",
    });
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });