// npx hardhat run scripts/scripts2/verify_all.js --network *
const network = hre.network.name;
const fs = require("fs");
const { 
    TREASURY_ADDRESS,  
    WRAPPED_FTM_MAINNET, 
    WRAPPED_FTM_TESTNET 
} = require('../constants');

async function main() {
  const dir = "./networks/";
  const fileName = "deploy_all_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.artion,
      constructorArguments: [TREASURY_ADDRESS, '2000000000000000000'],
      contract: "contracts/FantomArtion.sol:Artion",
    });
    await hre.run("verify:verify", {
      address: data.proxyAdmin,
      contract: "contracts/proxy/ProxyAdmin.sol:ProxyAdmin",
    });
    await hre.run("verify:verify", {
      address: data.marketplaceImpl,
      contract: "contracts/FantomMarketplace.sol:FantomMarketplace",
    });
    await hre.run("verify:verify", {
      address: data.marketplaceProxy,
      constructorArguments: [data.marketplaceImpl, data.proxyAdmin, []],
      contract: "contracts/proxy/AdminUpgradeabilityProxy.sol:AdminUpgradeabilityProxy",
    });
  } finally {
      await hre.run("verify:verify", {
        address: data.bundleMarketplaceImpl,
        contract: "contracts/FantomBundleMarketplace.sol:FantomBundleMarketplace",
      });
    }
  
  try {
    await hre.run("verify:verify", {
      address: data.bundleMarketplaceProxy,
      constructorArguments: [data.bundleMarketplaceImpl, data.proxyAdmin, []],
      contract: "contracts/proxy/AdminUpgradeabilityProxy.sol:AdminUpgradeabilityProxy",
    });
  } catch {
      await hre.run("verify:verify", {
        address: data.auctionImpl,
        contract: "contracts/FantomAuction.sol:FantomAuction",
      });
    }

  try {
    await hre.run("verify:verify", {
      address: data.auctionProxy,
      constructorArguments: [data.auctionImpl, data.proxyAdmin, []],
      contract: "contracts/proxy/AdminUpgradeabilityProxy.sol:AdminUpgradeabilityProxy",
    });
  } catch {
      await hre.run("verify:verify", {
        address: data.factory,
          constructorArguments: [
          data.auctionProxy,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          '10000000000000000000',
          TREASURY_ADDRESS,
          '50000000000000000000'],
        contract: "contracts/FantomNFTFactory.sol:FantomNFTFactory",
      });
      await hre.run("verify:verify", {
        address: data.privateFactory,
        constructorArguments: [
          data.auctionProxy,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          '10000000000000000000',
          TREASURY_ADDRESS,
          '50000000000000000000'],
        contract: "contracts/FantomNFTFactoryPrivate.sol:FantomNFTFactoryPrivate",
      });
      await hre.run("verify:verify", {
        address: data.nft,
        constructorArguments: [
          'Artion',
          'ART',
          data.auctionProxy,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          '10000000000000000000',
          TREASURY_ADDRESS],
        contract: "contracts/FantomNFTTradable.sol:FantomNFTTradable",
      });
      await hre.run("verify:verify", {
        address: data.nftPrivate,
        constructorArguments: [
          'IArtion',
          'IART',
          data.auctionProxy,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          '10000000000000000000',
          TREASURY_ADDRESS],
        contract: "contracts/FantomNFTTradablePrivate.sol:FantomNFTTradablePrivate",
      });
      await hre.run("verify:verify", {
        address: data.tokenRegistry,
        contract: "contracts/FantomTokenRegistry.sol:FantomTokenRegistry",
      });
      await hre.run("verify:verify", {
        address: data.addressRegistry,
        contract: "contracts/FantomAddressRegistry.sol:FantomAddressRegistry",
      });
      await hre.run("verify:verify", {
        address: data.priceFeed,
        constructorArguments: [data.addressRegistry, WRAPPED_FTM_TESTNET], // or MAINNET
        contract: "contracts/FantomPriceFeed.sol:FantomPriceFeed",
      });
      await hre.run("verify:verify", {
        address: data.artTradable,
        constructorArguments: [
          'FantomArt',
          'FART',
          '20000000000000000000',
          TREASURY_ADDRESS,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy],
          contract: "contracts/FantomArtTradable.sol:FantomArtTradable",
      });
      await hre.run("verify:verify", {
        address: data.artTradablePrivate,
        constructorArguments: [
          'FantomArt',
          'FART',
          '20000000000000000000',
          TREASURY_ADDRESS,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy],
        contract: "contracts/FantomArtTradablePrivate.sol:FantomArtTradablePrivate",
      });
      await hre.run("verify:verify", {
        address: data.artFactory,
        constructorArguments: [
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          '20000000000000000000',
          TREASURY_ADDRESS,
          '10000000000000000000'],
        contract: "contracts/FantomArtFactory.sol:FantomArtFactory",
      });
      await hre.run("verify:verify", {
        address: data.artFactoryPrivate,
        constructorArguments: [
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          '20000000000000000000',
          TREASURY_ADDRESS,
          '10000000000000000000'],
        contract: "contracts/FantomArtFactoryPrivate.sol:FantomArtFactoryPrivate",
      });
    }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });