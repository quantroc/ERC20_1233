const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Our demo token", function () {

  let qToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function() {
    const QToken = await hre.ethers.getContractFactory("QToken");
    qToken = await QToken.deploy();
    await qToken.deployed;

    [owner, addr1] = await ethers.getSigners();
  });

  it("Should successfully deploy", async function () {
    console.log("success");
  });

  it("Should deploy with 1m of supply for the owner of the contract", async function() {
    //const decimals = await qToken.decimals();
    const balance = await qToken.balanceOf(owner.address);
    //console.log(ethers.utils.formatEther(balance));
    //console.log(ethers.utils.parseEther("100"));
    expect(ethers.utils.formatEther(balance) == 1000000);
  });

  it("Should let you send tokens to another address", async function() {
    await qToken.transfer(addr1.address, ethers.utils.parseEther("100"));
    expect(await qToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should let you give another address the approval to send on your behalf", async function() {
    await qToken.connect(addr1).approve(owner.address, ethers.utils.parseEther("1000"));
    await qToken.transfer(addr1.address, ethers.utils.parseEther("1000"));
    await qToken.transferFrom(addr1.address, addr2.address,ethers.utils.parseEther("1000"));
    expect(await qToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("1000"));
  });
});
