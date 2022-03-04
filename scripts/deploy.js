// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, run } = require('hardhat');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const NFT = await ethers.getContractFactory('Flurks');
  const nft = await NFT.deploy();

  await nft.deployed();

  console.log('Flurks deployed to:', nft.address);

  // wait two minutes before verifying
  await sleep(60 * 2 * 1000);

  await run('verify:verify', {
    address: nft.address,
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
