import { expect } from "chai";
import { ethers } from "hardhat";

describe("Bond Depository", function () {
  it("Allow users to bond their tokens to mint native token...", async function () {
    const BondDepository = await ethers.getContractFactory("BondDepository");
    const bondDepository = await BondDepository.deploy("");
    await bondDepository.deployed();

    expect(await bondDepository.bondPrice()).to.equal(1000);
	expect(await bondDepository.terms().vestingTerms).to.equal(432000);
	expect(await bondDepository.bondPrice()).to.equal(1000);


    const setTermsTx = await bondDepository.setBondTerms(4, 10000);

    // wait until the transaction is mined
    await setTermsTx.wait();

    expect(await setTermsTx.bondPrice()).to.equal(10000);
  });
});
