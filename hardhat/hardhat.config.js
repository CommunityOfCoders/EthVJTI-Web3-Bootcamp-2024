require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("hardhat-deploy");
const {YOUR_SEPOLIA_URL,PRIVATE_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4", // Or any other version
  networks: {
    sepolia: {
      url:YOUR_SEPOLIA_URL,
      accounts: [PRIVATE_KEY.toString()]
    }
  }
};