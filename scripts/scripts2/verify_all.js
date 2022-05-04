// npx hardhat run scripts/scripts2/verify_all.js --network *
const network = hre.network.name;
const fs = require("fs");
const { TREASURY_ADDRESS, PLATFORM_FEE, WRAPPED_FTM_MAINNET, WRAPPED_FTM_TESTNET, ARTION_PLATFORM_FEE,
  NFT_FACTORY_MINT_FEE, NFT_FACTORY_PLATFORM_FEE, NFT_FACTORY_PRIVATE_MINT_FEE, 
  NFT_FACTORY_PRIVATE_PLATFORM_FEE, NFT_TRADABLE_NAME, NFT_TRADABLE_SYMBOL, NFT_TRADABLE_PLATFORM_FEE,
  NFT_TRADABLE_PRIVATE_NAME, NFT_TRADABLE_PRIVATE_SYMBOL, NFT_TRADABLE_PRIVATE_PLATFORM_FEE, 
  ART_TRADABLE_NAME, ART_TRADABLE_SYMBOL, ART_TRADABLE_PLATFORM_FEE, ART_TRADABLE_PRIVATE_NAME, 
  ART_TRADABLE_PRIVATE_SYMBOL, ART_TRADABLE_PRIVATE_PLATFORM_FEE, ART_FACTORY_MINT_FEE, ART_FACTORY_PLATFORM_FEE, 
  ART_FACTORY_PRIVATE_MINT_FEE, ART_FACTORY_PRIVATE_PLATFORM_FEE } = require('../constants');

async function main() {
  const dir = "./networks/";
  const fileName = "deploy_all_" + `${network}.json`;
  const data = JSON.parse(await fs.readFileSync(dir + fileName, { encoding: "utf8" }));

  try {
    await hre.run("verify:verify", {
      address: data.artion,
      constructorArguments: [TREASURY_ADDRESS, ARTION_PLATFORM_FEE],
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
          NFT_FACTORY_MINT_FEE,
          TREASURY_ADDRESS,
          NFT_FACTORY_PLATFORM_FEE],
        contract: "contracts/FantomNFTFactory.sol:FantomNFTFactory",
      });
      await hre.run("verify:verify", {
        address: data.privateFactory,
        constructorArguments: [
          data.auctionProxy,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          NFT_FACTORY_PRIVATE_MINT_FEE,
          TREASURY_ADDRESS,
          NFT_FACTORY_PRIVATE_PLATFORM_FEE],
        contract: "contracts/FantomNFTFactoryPrivate.sol:FantomNFTFactoryPrivate",
      });
      await hre.run("verify:verify", {
        address: data.nft,
        constructorArguments: [
          NFT_TRADABLE_NAME,
          NFT_TRADABLE_SYMBOL,
          data.auctionProxy,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          NFT_TRADABLE_PLATFORM_FEE,
          TREASURY_ADDRESS],
        contract: "contracts/FantomNFTTradable.sol:FantomNFTTradable",
      });
      await hre.run("verify:verify", {
        address: data.nftPrivate,
        constructorArguments: [
          NFT_TRADABLE_PRIVATE_NAME,
          NFT_TRADABLE_PRIVATE_SYMBOL,
          data.auctionProxy,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          NFT_TRADABLE_PRIVATE_PLATFORM_FEE,
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
          ART_TRADABLE_NAME,
          ART_TRADABLE_SYMBOL,
          ART_TRADABLE_PLATFORM_FEE,
          TREASURY_ADDRESS,
          data.marketplaceProxy,
          data.bundleMarketplaceProxy],
          contract: "contracts/FantomArtTradable.sol:FantomArtTradable",
      });
      await hre.run("verify:verify", {
        address: data.artTradablePrivate,
        constructorArguments: [
          ART_TRADABLE_PRIVATE_NAME,
          ART_TRADABLE_PRIVATE_SYMBOL,
          ART_TRADABLE_PRIVATE_PLATFORM_FEE,
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
          ART_FACTORY_MINT_FEE,
          TREASURY_ADDRESS,
          ART_FACTORY_PLATFORM_FEE],
        contract: "contracts/FantomArtFactory.sol:FantomArtFactory",
      });
      await hre.run("verify:verify", {
        address: data.artFactoryPrivate,
        constructorArguments: [
          data.marketplaceProxy,
          data.bundleMarketplaceProxy,
          ART_FACTORY_PRIVATE_MINT_FEE,
          TREASURY_ADDRESS,
          ART_FACTORY_PRIVATE_PLATFORM_FEE],
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