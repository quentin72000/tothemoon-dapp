// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Rocket{ 
    
    string public name;

    uint256 public goal;
    uint256 public currentAltitude;

    uint256 public distancePerFuel;

    mapping(address => uint256) public points;

    IERC20 public fuelToken;
    address private owner;

    event RocketMove(address rocketOperator, uint256 newAltitude);

    constructor(string memory _name, uint256 _goal, uint256 _distancePerFuel, address _fuelTokenAddress){
        require(_goal > 0, "Goal cannot be zero.");
        require(_distancePerFuel > 0, "Unit price cannot be zero.");
        require(_fuelTokenAddress != address(0) /*&& _tokenAddress.code.length != 0*/, "Invalid token address.");
        name = _name;
        goal = _goal;
        distancePerFuel = _distancePerFuel;
        fuelToken = IERC20(_fuelTokenAddress);
        owner = msg.sender;
    }

    function giveFuel(uint256 fuelAmount) public {
        require(currentAltitude < goal, "Rocket has landed.");
        require(fuelAmount >= 10**18, "Min is 1.");
        uint256 distance = (fuelAmount / 10**18) * distancePerFuel;
        require(currentAltitude + distance <= goal, "Too much to land.");
        require(fuelToken.balanceOf(msg.sender) >= fuelAmount, "Not enough fuel token.");
        require(fuelToken.allowance(msg.sender, address(this)) >= fuelAmount, "Not enough allowance.");

        require(fuelToken.transferFrom(msg.sender, address(this), fuelAmount));
        currentAltitude += distance;
        points[msg.sender] += distance;
    }

    function setFuelEficiency(uint256 _distancePerFuel) public {
        require(msg.sender == owner);
        require(_distancePerFuel > 0);
        distancePerFuel = _distancePerFuel;
    }
 }