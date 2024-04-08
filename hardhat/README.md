# Deploy on Hardhat
`Voting.sol` contains functions that allows access-controlled addition of candidates for elections, and forms the basis of a decentralized voting platform.

## Deploy on Ethereum Sepolia Testnet using Hardhat ⚒ 

### STEP 1: Initialize the Hardhat Project

- Create a new project directory, and navigate to it using the following commands:
```
mkdir hardhat
cd hardhat
```
- Initialize a Node.js project and install Hardhat using the following commands:
```
npm init -y 
npm install --save hardhat
```

### STEP 2: Develop your Smart Contract

In the `contracts` directory, create a new file `Voting.sol`. In this file, copy the [code](../deVote-Voting-dApp/contracts/VotingContract.sol) of our driver smart contract.


### STEP 3: Set up the Deployment Script

- Inside the `scripts` directory, create a file named `deploy.js`.

- Add the deployment script:

```
const hre = require("hardhat");

async function main() {
  const voting = await hre.ethers.deployContract("Voting");
  const contract = await voting.waitForDeployment();
  const contract_addr = await contract.getAddress();
  console.log("Contract deployed at address: ",contract_addr);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

```

### STEP 4: Configure Hardhat

- Check out these guides on how to [obtain your account's private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) and how to [obtain your custom Alchemy API for Ethereum Sepolia Testnet](https://docs.alchemy.com/docs/alchemy-quickstart-guide#:~:text=To%20use%20Alchemy%27s%20products%2C%20you%20need%20an%20API,when%20you%20create%20an%20app%20from%20the%20dashboard.).

- Install DotEnv using the command: `npm install dotenv`. DotEnv is a lightweight npm package that automatically loads environment variables from a .env file into the process.env object. This helps in ensuring the security and prevention of misuse of your private key and API endpoint.
- Then in your file `hardhat.config.js`, require and configure the package like this: `require('dotenv').config()`.

- In the same file, add the following configuration:
```
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
```

NOTE: **Never share your private key with anyone**. Any person who has access to your account's private key has complete control over your digital assets.


### STEP 5: Deploy your Contract

Compile your contract by running the following command:
`npx hardhat compile`

Deploy your contract by running the `deploy.js` script using th following command:

`npx hardhat run scripts/deploy.js --network sepolia`

You have successfully deployed your contract! You can obtain the contract ABI in the `artifacts` directory and the contract address will be present on the command line after successful compilation and deployment.


## Deployed Contract ⚒

 Check out the deployed contract instance used in this project [**HERE**](https://sepolia.etherscan.io/address/0x40de628C909Bc08451bed4E8d2AD15Bb04451f2e).

                   