require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ternoa: {
      chainId: 752024,
      url: "https://rpc.zkevm.ternoa.network",
      accounts: [vars.get("TERNOA_PRIVATE_KEY")]
    }
  }
};
