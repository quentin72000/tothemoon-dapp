import FuelCounter from "../FuelCounter";
import PointsCounter from "../PointsCounter";
import PropTypes from 'prop-types';

export default function Profile({ fuelQuantityData, pointsData}) {

    
    return <div>
      <FuelCounter fuelQuantityData={fuelQuantityData}/>
      <PointsCounter pointsData={pointsData}/>
    </div>
}

Profile.propTypes = {
  fuelQuantityData: PropTypes.object.isRequired,
  pointsData: PropTypes.object.isRequired
};