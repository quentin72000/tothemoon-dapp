// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract FuelToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {

    ERC20 cttmToken;
    uint256 public conversionRate;

    event Swap(address indexed swapper, uint256 amountIn, uint256 amountOut);
    
    event RateChange(uint256 newRate);

    constructor(address cttmTokenAddress, uint _conversionRate)
        ERC20("FuelToken", "FUEL")
        Ownable(msg.sender)
        ERC20Permit("FuelToken")
    {
        cttmToken = ERC20(cttmTokenAddress);
        conversionRate = _conversionRate;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function swapCTTMToFuel(uint256 amount) public {
        require(cttmToken.balanceOf(msg.sender) >= amount, "Not enought CTTM Token.");
        require(cttmToken.allowance(msg.sender, address(this)) >= amount, "Not enought allowance");

        cttmToken.transferFrom(msg.sender, address(this), amount);
        uint256 fuelAmount = amount / conversionRate;
        _mint(msg.sender, fuelAmount);

        emit Swap(msg.sender, amount, fuelAmount);
    }


    function setConversionRate(uint256 _conversionRate) public onlyOwner {
        conversionRate = _conversionRate;
        emit RateChange(_conversionRate);
    }
}
