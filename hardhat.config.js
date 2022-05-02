require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-truffle5');
require("@nomiclabs/hardhat-etherscan");
require('hardhat-gas-reporter');
require('solidity-coverage');
require('@nomiclabs/hardhat-solhint');
require('hardhat-contract-sizer');
require('@openzeppelin/hardhat-upgrades');

module.exports = {
  solidity: {
    version: '0.6.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  /*gasReporter: {
    currency: 'BNB',
    enabled: false,
    gasPrice: 50,
  },*/
  networks: {
    mainnet: {
      url: process.env.RPC_NODE_URL_MAINNET,
      accounts: [process.env.PRIVATE_KEY]
    },
    rinkeby: {
      url: process.env.RPC_NODE_URL_RINKEBY,
      accounts: [process.env.PRIVATE_KEY],
      //blockGasLimit: 100000
    },
    ropsten: {
      url: process.env.RPC_NODE_URL_ROPSTEN,
      accounts: [process.env.PRIVATE_KEY]
    },
    bsctestnet: {
      url: process.env.RPC_NODE_URL_BSCTESTNET,
      accounts: [process.env.PRIVATE_KEY]
    },
    goerli: {
      url: process.env.RPC_NODE_URL_GOERLI,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.SCAN_API_KEY
  }
};
