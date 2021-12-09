// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const rug = "0xb8EF3a190b68175000B74B4160d325FD5024760e";

  const principle = "0x133933fc4316cb5f058321898507a32248f0a007"; //To be set
  
  const treasury = "0x2F87A9550f19666cEF5De29c5F613966cf164BE6";
  const dao = "0x2F87A9550f19666cEF5De29c5F613966cf164BE6";
  const bondCalculator = "0x92c7e16d66ddcc1fdcccbdd2eeb507eed0baecb2";
  //const bondCalculator = "0x0000000000000000000000000000000000000000"


  // We get the contract to deploy
  const BondDepository = await ethers.getContractFactory("contracts/BondDepository.sol:RugBondDepository");
  const bondDepository = await BondDepository.deploy(rug, principle, treasury, dao, bondCalculator); //Set parameters

  await bondDepository.deployed();

  console.log("New Bond Depository deployed to:", bondDepository.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
