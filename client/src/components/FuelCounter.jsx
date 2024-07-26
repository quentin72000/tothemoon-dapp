import { ethers } from "ethers"
import PropTypes from "prop-types";

export default function FuelCounter({ fuelQuantityData }) {
  return (
    <p>You have {ethers.formatUnits(fuelQuantityData.result, 18).split('.')[0]} FUEL</p>
  )
}

FuelCounter.propTypes = {
  fuelQuantityData: PropTypes.object.isRequired,
};
