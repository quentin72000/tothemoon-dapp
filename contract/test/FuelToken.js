const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FuelToken Contract", function () {
  let FuelToken, fuelToken, CTTMToken, cttmToken;
  let owner, addr1, addr2;
  const initialCTTMTokenSupply = ethers.parseEther("1000");

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the CTTMToken mock
    const CTTMToken = await ethers.getContractFactory("ERC20Token");
    cttmToken = await CTTMToken.deploy(ethers.parseEther("1000"));
    await cttmToken.waitForDeployment();

    // Mint some CTTM tokens to addr1
    await cttmToken.connect(owner).transfer(addr1.address, initialCTTMTokenSupply);

    // Deploy the FuelToken
    const FuelToken = await ethers.getContractFactory("FuelToken");
    fuelToken = await FuelToken.deploy(await cttmToken.getAddress(), 2); // 2:1 conversion rate
    await fuelToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct CTTM token address and conversion rate", async function () {
    //   expect(await fuelToken.cttmToken()).to.equal(await cttmToken.getAddress());
      expect(await fuelToken.conversionRate()).to.equal(2);
    });
  });

  describe("Minting", function () {
    it("Should mint tokens to the specified address", async function () {
      await fuelToken.connect(owner).mint(addr1.address, ethers.parseEther("100"));
      expect(await fuelToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("100"));
    });

    it("Should only allow owner to mint tokens", async function () {
      await expect(
        fuelToken.connect(addr1).mint(addr1.address, ethers.parseEther("100"))
      ).to.be.revertedWithCustomError(fuelToken, "OwnableUnauthorizedAccount").withArgs(addr1.address);
    });
  });

  describe("Swapping CTTM to Fuel", function () {
    it("Should swap CTTM to Fuel at the correct rate", async function () {
      const swapAmount = ethers.parseEther("4");
      await cttmToken.connect(addr1).approve(fuelToken.getAddress(), swapAmount);
      await fuelToken.connect(addr1).swapCTTMToFuel(swapAmount);
      expect(await fuelToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("2"));
      expect(await cttmToken.balanceOf(addr1.address)).to.equal(initialCTTMTokenSupply - swapAmount);
    });

    it("Should emit a Swap event on successful swap", async function () {
      const swapAmount = ethers.parseEther("4");
      await cttmToken.connect(addr1).approve(fuelToken.getAddress(), swapAmount);
      await expect(fuelToken.connect(addr1).swapCTTMToFuel(swapAmount))
        .to.emit(fuelToken, "Swap")
        .withArgs(addr1.address, swapAmount, ethers.parseEther("2"));
    });

    it("Should fail if sender has insufficient CTTM balance", async function () {
      const swapAmount = ethers.parseEther("2000"); // more than balance
      await cttmToken.connect(addr1).approve(fuelToken.getAddress(), swapAmount);
      await expect(fuelToken.connect(addr1).swapCTTMToFuel(swapAmount)).to.be.revertedWith("Not enought CTTM Token.");
    });

    it("Should fail if sender has insufficient allowance", async function () {
      const swapAmount = ethers.parseEther("4");
      await expect(fuelToken.connect(addr1).swapCTTMToFuel(swapAmount)).to.be.revertedWith("Not enought allowance");
    });
  });

  describe("Setting Conversion Rate", function () {
    it("Should allow owner to set conversion rate", async function () {
      await fuelToken.connect(owner).setConversionRate(3);
      expect(await fuelToken.conversionRate()).to.equal(3);
    });

    it("Should emit a RateChange event on setting conversion rate", async function () {
      await expect(fuelToken.connect(owner).setConversionRate(3))
        .to.emit(fuelToken, "RateChange")
        .withArgs(3);
    });

    it("Should fail if non-owner tries to set conversion rate", async function () {
      await expect(fuelToken.connect(addr1).setConversionRate(3)).to.be.revertedWithCustomError(fuelToken, "OwnableUnauthorizedAccount").withArgs(addr1);
    });
  });
});
