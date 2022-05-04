// npx hardhat run scripts/scripts2/deploy_all.js --network *
const fs = require('fs');
const network = hre.network.name;

async function main(network) {
    const { TREASURY_ADDRESS, PLATFORM_FEE, WRAPPED_FTM_MAINNET, WRAPPED_FTM_TESTNET, ARTION_PLATFORM_FEE,
            NFT_FACTORY_MINT_FEE, NFT_FACTORY_PLATFORM_FEE, NFT_FACTORY_PRIVATE_MINT_FEE, 
            NFT_FACTORY_PRIVATE_PLATFORM_FEE, NFT_TRADABLE_NAME, NFT_TRADABLE_SYMBOL, NFT_TRADABLE_PLATFORM_FEE,
            NFT_TRADABLE_PRIVATE_NAME, NFT_TRADABLE_PRIVATE_SYMBOL, NFT_TRADABLE_PRIVATE_PLATFORM_FEE, 
            ART_TRADABLE_NAME, ART_TRADABLE_SYMBOL, ART_TRADABLE_PLATFORM_FEE, ART_TRADABLE_PRIVATE_NAME, 
            ART_TRADABLE_PRIVATE_SYMBOL, ART_TRADABLE_PRIVATE_PLATFORM_FEE, ART_FACTORY_MINT_FEE, ART_FACTORY_PLATFORM_FEE, 
            ART_FACTORY_PRIVATE_MINT_FEE, ART_FACTORY_PRIVATE_PLATFORM_FEE } = require('../constants');

    console.log('network: ', network.name);

    const namesAndAddresses = {};
    const [deployer] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();
    console.log(`Deployer's address: `, deployerAddress);
    
    ////////////
    const Artion = await ethers.getContractFactory('Artion');
    const artion = await Artion.deploy(TREASURY_ADDRESS, ARTION_PLATFORM_FEE);
  
    await artion.deployed();  
    console.log('FantomArtion deployed at', artion.address);
    ///////////

    //////////
    const ProxyAdmin = await ethers.getContractFactory('ProxyAdmin');
    const proxyAdmin = await ProxyAdmin.deploy();
    await proxyAdmin.deployed();

    const PROXY_ADDRESS = proxyAdmin.address;

    console.log('ProxyAdmin deployed to:', proxyAdmin.address);

    const AdminUpgradeabilityProxyFactory = await ethers.getContractFactory('AdminUpgradeabilityProxy');
    //////////

    /////////
    const Marketplace = await ethers.getContractFactory('FantomMarketplace');
    const marketplaceImpl = await Marketplace.deploy();
    await marketplaceImpl.deployed();

    console.log('FantomMarketplace deployed to:', marketplaceImpl.address);
    
    const marketplaceProxy = await AdminUpgradeabilityProxyFactory.deploy(
        marketplaceImpl.address,
        PROXY_ADDRESS,
        []
    );
    await marketplaceProxy.deployed();
    console.log('Marketplace Proxy deployed at ', marketplaceProxy.address);
    const MARKETPLACE_PROXY_ADDRESS = marketplaceProxy.address;
    const marketplace = await ethers.getContractAt('FantomMarketplace', marketplaceProxy.address);
    
    await marketplace.initialize(TREASURY_ADDRESS, PLATFORM_FEE);
    console.log('Marketplace Proxy initialized');
    
    /////////

    /////////
    const BundleMarketplace = await ethers.getContractFactory(
        'FantomBundleMarketplace'
      );
    const bundleMarketplaceImpl = await BundleMarketplace.deploy();
    await bundleMarketplaceImpl.deployed();
    console.log('FantomBundleMarketplace deployed to:', bundleMarketplaceImpl.address);
    
    const bundleMarketplaceProxy = await AdminUpgradeabilityProxyFactory.deploy(
        bundleMarketplaceImpl.address,
        PROXY_ADDRESS,
        []
      );
    await bundleMarketplaceProxy.deployed();
    console.log('Bundle Marketplace Proxy deployed at ', bundleMarketplaceProxy.address);  
    const BUNDLE_MARKETPLACE_PROXY_ADDRESS = bundleMarketplaceProxy.address;
    const bundleMarketplace = await ethers.getContractAt('FantomBundleMarketplace', bundleMarketplaceProxy.address);
    
    await bundleMarketplace.initialize(TREASURY_ADDRESS, PLATFORM_FEE);
    console.log('Bundle Marketplace Proxy initialized');
    
    ////////

    ////////
    const Auction = await ethers.getContractFactory('FantomAuction');
    const auctionImpl = await Auction.deploy();
    await auctionImpl.deployed();
    console.log('FantomAuction deployed to:', auctionImpl.address);

    const auctionProxy = await AdminUpgradeabilityProxyFactory.deploy(
        auctionImpl.address,
        PROXY_ADDRESS,
        []
      );

    await auctionProxy.deployed();
    console.log('Auction Proxy deployed at ', auctionProxy.address);
    const AUCTION_PROXY_ADDRESS = auctionProxy.address;
    const auction = await ethers.getContractAt('FantomAuction', auctionProxy.address);
    
    await auction.initialize(TREASURY_ADDRESS);
    console.log('Auction Proxy initialized');
   
    ////////

    ////////
    const Factory = await ethers.getContractFactory('FantomNFTFactory');
    const factory = await Factory.deploy(
        AUCTION_PROXY_ADDRESS,
        MARKETPLACE_PROXY_ADDRESS,
        BUNDLE_MARKETPLACE_PROXY_ADDRESS,
        NFT_FACTORY_MINT_FEE,
        TREASURY_ADDRESS,
        NFT_FACTORY_PLATFORM_FEE
    );
    await factory.deployed();
    console.log('FantomNFTFactory deployed to:', factory.address);

    const PrivateFactory = await ethers.getContractFactory(
        'FantomNFTFactoryPrivate'
    );
    const privateFactory = await PrivateFactory.deploy(
        AUCTION_PROXY_ADDRESS,
        MARKETPLACE_PROXY_ADDRESS,
        BUNDLE_MARKETPLACE_PROXY_ADDRESS,
        NFT_FACTORY_PRIVATE_MINT_FEE,
        TREASURY_ADDRESS,
        NFT_FACTORY_PRIVATE_PLATFORM_FEE
    );
    await privateFactory.deployed();
    console.log('FantomNFTFactoryPrivate deployed to:', privateFactory.address);
    ////////    

    ////////
    const NFTTradable = await ethers.getContractFactory('FantomNFTTradable');
    const nft = await NFTTradable.deploy(
        NFT_TRADABLE_NAME,
        NFT_TRADABLE_SYMBOL,
        AUCTION_PROXY_ADDRESS,
        MARKETPLACE_PROXY_ADDRESS,
        BUNDLE_MARKETPLACE_PROXY_ADDRESS,
        NFT_TRADABLE_PLATFORM_FEE,
        TREASURY_ADDRESS
    );
    await nft.deployed();
    console.log('FantomNFTTradable deployed to:', nft.address);

    const NFTTradablePrivate = await ethers.getContractFactory(
        'FantomNFTTradablePrivate'
    );
    const nftPrivate = await NFTTradablePrivate.deploy(
        NFT_TRADABLE_PRIVATE_NAME,
        NFT_TRADABLE_PRIVATE_SYMBOL,
        AUCTION_PROXY_ADDRESS,
        MARKETPLACE_PROXY_ADDRESS,
        BUNDLE_MARKETPLACE_PROXY_ADDRESS,
        NFT_TRADABLE_PRIVATE_PLATFORM_FEE,
        TREASURY_ADDRESS
    );
    await nftPrivate.deployed();
    console.log('FantomNFTTradablePrivate deployed to:', nftPrivate.address);
    ////////

    ////////
    const TokenRegistry = await ethers.getContractFactory('FantomTokenRegistry');
    const tokenRegistry = await TokenRegistry.deploy();

    await tokenRegistry.deployed();

    console.log('FantomTokenRegistry deployed to', tokenRegistry.address);
    ////////

    ////////
    const AddressRegistry = await ethers.getContractFactory('FantomAddressRegistry');
    const addressRegistry = await AddressRegistry.deploy();

    await addressRegistry.deployed();

    console.log('FantomAddressRegistry deployed to', addressRegistry.address);
    const FANTOM_ADDRESS_REGISTRY = addressRegistry.address;
    ////////

    ////////
    const PriceFeed = await ethers.getContractFactory('FantomPriceFeed');
    const WRAPPED_FTM = network.name === 'mainnet' ? WRAPPED_FTM_MAINNET : WRAPPED_FTM_TESTNET;
    const priceFeed = await PriceFeed.deploy(
      FANTOM_ADDRESS_REGISTRY,
      WRAPPED_FTM
    );
  
    await priceFeed.deployed();
  
    console.log('FantomPriceFeed deployed to', priceFeed.address);
    ////////

    ////////
    const ArtTradable = await ethers.getContractFactory('FantomArtTradable');
    const artTradable = await ArtTradable.deploy(
        ART_TRADABLE_NAME,
        ART_TRADABLE_SYMBOL,
        ART_TRADABLE_PLATFORM_FEE,
        TREASURY_ADDRESS,
        MARKETPLACE_PROXY_ADDRESS,
        BUNDLE_MARKETPLACE_PROXY_ADDRESS
    );
    await artTradable.deployed();
    console.log('FantomArtTradable deployed to:', artTradable.address);

    const ArtTradablePrivate = await ethers.getContractFactory(
        'FantomArtTradablePrivate'
    );
    const artTradablePrivate = await ArtTradablePrivate.deploy(
        ART_TRADABLE_PRIVATE_NAME,
        ART_TRADABLE_PRIVATE_SYMBOL,
        ART_TRADABLE_PRIVATE_PLATFORM_FEE,
        TREASURY_ADDRESS,
        MARKETPLACE_PROXY_ADDRESS,
        BUNDLE_MARKETPLACE_PROXY_ADDRESS
    );
    await artTradablePrivate.deployed();
    console.log('FantomArtTradablePrivate deployed to:', artTradablePrivate.address);
    ////////

    ////////
    const ArtFactory = await ethers.getContractFactory('FantomArtFactory');
    const artFactory = await ArtFactory.deploy(
        MARKETPLACE_PROXY_ADDRESS,
        BUNDLE_MARKETPLACE_PROXY_ADDRESS,
        ART_FACTORY_MINT_FEE,
        TREASURY_ADDRESS,
        ART_FACTORY_PLATFORM_FEE
     );
    await artFactory.deployed();
    console.log('FantomArtFactory deployed to:', artFactory.address);

    const ArtFactoryPrivate = await ethers.getContractFactory(
        'FantomArtFactoryPrivate'
    );
    const artFactoryPrivate = await ArtFactoryPrivate.deploy(
        MARKETPLACE_PROXY_ADDRESS,
        BUNDLE_MARKETPLACE_PROXY_ADDRESS,
        ART_FACTORY_PRIVATE_MINT_FEE,
        TREASURY_ADDRESS,
        ART_FACTORY_PRIVATE_PLATFORM_FEE
    );
    await artFactoryPrivate.deployed();
    console.log('FantomArtFactoryPrivate deployed to:', artFactoryPrivate.address);
    ////////
    
    await marketplace.updateAddressRegistry(FANTOM_ADDRESS_REGISTRY);   
    await bundleMarketplace.updateAddressRegistry(FANTOM_ADDRESS_REGISTRY);
    
    await auction.updateAddressRegistry(FANTOM_ADDRESS_REGISTRY);
    
    await addressRegistry.updateArtion(artion.address);
    await addressRegistry.updateAuction(auction.address);
    await addressRegistry.updateMarketplace(marketplace.address);
    await addressRegistry.updateBundleMarketplace(bundleMarketplace.address);
    await addressRegistry.updateNFTFactory(factory.address);
    await addressRegistry.updateTokenRegistry(tokenRegistry.address);
    await addressRegistry.updatePriceFeed(priceFeed.address);
    await addressRegistry.updateArtFactory(artFactory.address);   

    await tokenRegistry.add(WRAPPED_FTM);

    namesAndAddresses.artion = artion.address;
    //
    namesAndAddresses.proxyAdmin = proxyAdmin.address;
    namesAndAddresses.marketplaceImpl = marketplaceImpl.address;
    namesAndAddresses.marketplaceProxy = marketplaceProxy.address;
    //
    namesAndAddresses.bundleMarketplaceImpl = bundleMarketplaceImpl.address;
    namesAndAddresses.bundleMarketplaceProxy = bundleMarketplaceProxy.address;
    //
    namesAndAddresses.auctionImpl = auctionImpl.address;
    namesAndAddresses.auctionProxy = auctionProxy.address;
    //
    namesAndAddresses.factory = factory.address;
    namesAndAddresses.privateFactory = privateFactory.address;
    //
    namesAndAddresses.nft = nft.address; // NFTTradable
    namesAndAddresses.nftPrivate = nftPrivate.address;
    //
    namesAndAddresses.tokenRegistry = tokenRegistry.address;
    //
    namesAndAddresses.addressRegistry = addressRegistry.address;
    //
    namesAndAddresses.priceFeed = priceFeed.address;
    //
    namesAndAddresses.artTradable = artTradable.address;
    namesAndAddresses.artTradablePrivate = artTradablePrivate.address;
    //
    namesAndAddresses.artFactory = artFactory.address;
    namesAndAddresses.artFactoryPrivate = artFactoryPrivate.address;

    const data = await JSON.stringify(namesAndAddresses, null, 2);
    const dir = './networks/';
    if (!fs.existsSync(dir)) {
     fs.mkdirSync(dir, { recursive: true });
    }
    const fileName = 'deploy_all_' + `${network}.json`;

    await fs.writeFileSync(dir + fileName, data, { encoding: 'utf8' });
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main(network)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  

