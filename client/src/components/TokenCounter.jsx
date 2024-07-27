import PropTypes from 'prop-types';

export default function TokenCounter({tokenQuantity}) {

    return (
        <p>You have {tokenQuantity.toString()/(10**18)} $CTTM</p>
  )
}

TokenCounter.propTypes = {
    tokenQuantity: PropTypes.bigint.isRequired,
  };