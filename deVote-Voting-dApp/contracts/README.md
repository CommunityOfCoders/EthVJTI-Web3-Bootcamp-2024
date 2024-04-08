# Smart Contracts Used
`Voting.sol` contains functions that allows access-controlled addition of candidates for elections, and forms the basis of a decentralized voting platform.

## Deploy on Ethereum Sepolia Testnet

<b>NOTE</b>: This steps assumes that you have Metamask Wallet setup and configured for use. If you have not already, check [this guide](https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask) to get started. 


1. Copy the [contract](../contracts/VotingContract.sol) and paste it to [Remix IDE](https://remix.ethereum.org).
2. Navigate to the `COMPILE` tab, select an appropriate compiler version, and compile the contract.
3. Select `Injected Provider - Metamask` in the `ENVIRONMENT` field of the `DEPLOY` tab and make sure your Metamask wallet is unlocked. This will connect Remix to the first account in your Metamask wallet.
4. Deploy the contract by approving the transaction request. Record the deployed contract Address from the `Deployed/Unpinned Contracts` field in the `DEPLOY` tab and the Contract Application Binary Interface or ABI from the `COMPILE` tab. You have successfully deployed your contract on the Sepolia Testnet!
5. (OPTIONAL) Paste the deployed contract address in the [Sepolia Testnet Explorer](https://sepolia.etherscan.io/) to view the details of the contract.

Note that you cannot vote for a particular candidate using the same wallet address.

 ## Deployed Contract ⚒

 Check out the deployed contract instance used in this project [**HERE**](https://sepolia.etherscan.io/tx/0x3071e84b006b9576319d7e60a17c03c460c3a16e7009d6ae6a7a9eef1e3d56c5).

                   