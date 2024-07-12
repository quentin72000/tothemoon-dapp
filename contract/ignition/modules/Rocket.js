const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ROCKET_NAME = "";
const EARTH_TO_MOON_DISTANCE = 384_400;
const DISTANCE_PER_FUEL = 1;
const TOKEN_ADDRESS = "0x4489A23120990AdBcDce4766389607c7C37C25b4";

const TOKEN_TO_FUEL_DEFAULT_RATE = 10;

module.exports = buildModule("RocketModule", (m) => {

    const tokenAddress = m.getParameter("_fuelTokenAddress", TOKEN_ADDRESS);
    const conversionRate = m.getParameter("_conversionRate", TOKEN_TO_FUEL_DEFAULT_RATE);
    const fuelToken = m.contract("FuelToken", [tokenAddress, conversionRate]);

    const name = m.getParameter("_name", ROCKET_NAME);
    const goal = m.getParameter("_goal", EARTH_TO_MOON_DISTANCE);
    const unitPrice = m.getParameter("_distancePerFuel", DISTANCE_PER_FUEL);

    const rocket = m.contract("Rocket", [name, goal, unitPrice, fuelToken], {
        after: [fuelToken]
    });

    return { fuelToken, rocket };
});
