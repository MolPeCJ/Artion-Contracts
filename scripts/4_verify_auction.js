// npx hardhat run scripts41_verify_auction.js --network *
const network = hre.network.name;
const fs = require("fs");

async function main() {
  const dir = "./networks/";
  const fileName = "auction_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.auctionImpl,
      contract: "contracts/FantomAuction.sol:FantomAuction",
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