const hre = require("hardhat");

async function main() {
  const QToken = await hre.ethers.getContractFactory("QToken");
  const qToken = await QToken.deploy();

  await qToken.deployed();

  console.log("Quan Token deployed to:",qToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });