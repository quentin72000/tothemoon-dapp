
import PropTypes from 'prop-types';

export default function PointsCounter({pointsData}) {
    return (
        <p>You gained {pointsData.result.toString()} points.</p>
  )
}

PointsCounter.propTypes = {
    pointsData: PropTypes.object.isRequired
};
