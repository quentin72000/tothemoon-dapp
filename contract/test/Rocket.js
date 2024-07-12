const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { expect } = require("chai");
  
  describe("Rocket Contract", function () {
    async function deployRocketFixture() {
      const [owner, addr1, addr2] = await ethers.getSigners();
  
      // Deploy the ERC20Token token
      const Token = await ethers.getContractFactory("ERC20Token");
      const token = await Token.deploy(ethers.parseEther("1000"));
      await token.waitForDeployment();

      const FuelToken = await ethers.getContractFactory("FuelToken");
      const fuelToken = await FuelToken.deploy(token.getAddress(), 1);
      await token.waitForDeployment();

      await fuelToken.mint(owner.address, ethers.parseEther("1000"));
  
      // Deploy the Rocket contract
      const Rocket = await ethers.getContractFactory("Rocket");
      const rocket = await Rocket.deploy("Apollo" ,100, 1, fuelToken.getAddress());
      await rocket.waitForDeployment();
  
      return { rocket, token, fuelToken, owner, addr1, addr2 };
    }
  
    describe("Deployment", function () {
      it("Should deploy successfully with valid parameters", async function () {
        const { rocket, fuelToken } = await loadFixture(deployRocketFixture);
        
        expect(await rocket.name()).to.equal("Apollo")
        expect(await rocket.goal()).to.equal(100);
        expect(await rocket.distancePerFuel()).to.equal(1);
        expect(await rocket.fuelToken()).to.equal(await fuelToken.getAddress());
      });
  
      it("Should fail if goal is zero", async function () {
        const Token = await ethers.getContractFactory("ERC20Token");
        const token = await Token.deploy(ethers.parseEther("1000"));
        await token.waitForDeployment();

        const FuelToken = await ethers.getContractFactory("FuelToken");
        const fuelToken = await FuelToken.deploy(token.getAddress(), 100);
        await fuelToken.waitForDeployment();
  
        const Rocket = await ethers.getContractFactory("Rocket");
        await expect(Rocket.deploy("Apollo", 0, ethers.parseEther("1"), await fuelToken.getAddress())).to.be.revertedWith("Goal cannot be zero.");
      });
  
      it("Should fail if unit price is zero", async function () {
        const Token = await ethers.getContractFactory("ERC20Token");
        const token = await Token.deploy(ethers.parseEther("1000"));
        await token.waitForDeployment();

        const FuelToken = await ethers.getContractFactory("FuelToken");
        const fuelToken = await FuelToken.deploy(token.getAddress(), 100);
        await fuelToken.waitForDeployment();
  
        const Rocket = await ethers.getContractFactory("Rocket");
        await expect(Rocket.deploy("Apollo", 100, 0, await fuelToken.getAddress())).to.be.revertedWith("Unit price cannot be zero.");
      });
  
      it("Should fail if token address is invalid", async function () {
        const Rocket = await ethers.getContractFactory("Rocket");
        await expect(Rocket.deploy("Apollo", 100, ethers.parseEther("1"), ethers.ZeroAddress)).to.be.revertedWith("Invalid token address.");
      });
    });
  
    describe("giveFuel", function () {
      it("Should allow giving fuel and update the current altitude and points", async function () {
        const { rocket, fuelToken, owner } = await loadFixture(deployRocketFixture);
  
        // Approve and give fuel
        await fuelToken.approve(rocket.getAddress(), ethers.parseEther("10"));
        await rocket.giveFuel(ethers.parseEther("10"));
        expect(await rocket.currentAltitude()).to.equal(10n * await rocket.distancePerFuel());
        expect(await rocket.points(owner.address)).to.equal(10n * await rocket.distancePerFuel());
      });
  
      it("Should transfer the correct amount of tokens from sender to contract", async function () {
        const { rocket, fuelToken, owner } = await loadFixture(deployRocketFixture);
  
        const initialOwnerBalance = await fuelToken.balanceOf(owner.address);
        const initialContractBalance = await fuelToken.balanceOf(rocket.getAddress());
  
        // Approve and give fuel
        await fuelToken.approve(rocket.getAddress(), ethers.parseEther("10"));
        await rocket.giveFuel(ethers.parseEther("10"));
  
        const finalOwnerBalance = await fuelToken.balanceOf(owner.address);
        const finalContractBalance = await fuelToken.balanceOf(rocket.getAddress());
  
        expect(finalOwnerBalance).to.equal(initialOwnerBalance - ethers.parseEther("10"));
        expect(finalContractBalance).to.equal(initialContractBalance + ethers.parseEther("10"));
      });
  
      it("Should fail if rocket has landed", async function () {
        const { rocket, fuelToken } = await loadFixture(deployRocketFixture);
  
        await fuelToken.approve(rocket.getAddress(), ethers.parseEther("100"));
        await rocket.giveFuel(ethers.parseEther("100"));
  
        await expect(rocket.giveFuel(1)).to.be.revertedWith("Rocket has landed.");
      });
  
      it("Should fail if too much fuel is given", async function () {
        const { rocket } = await loadFixture(deployRocketFixture);
  
        await expect(rocket.giveFuel(ethers.parseEther("101"))).to.be.revertedWith("Too much to land.");
      });
  
      it("Should fail if sender doesn't have enough tokens", async function () {
        const { rocket, addr1 } = await loadFixture(deployRocketFixture);
  
        await expect(rocket.connect(addr1).giveFuel(ethers.parseEther("10"))).to.be.revertedWith("Not enough fuel token.");
      });
  
      it("Should fail if allowance is not enough", async function () {
        const { rocket, fuelToken, addr1 } = await loadFixture(deployRocketFixture);
  
        await fuelToken.transfer(addr1.address, ethers.parseEther("10"));
        await expect(rocket.connect(addr1).giveFuel(ethers.parseEther("10"))).to.be.revertedWith("Not enough allowance.");
      });
    });
  });
  