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

