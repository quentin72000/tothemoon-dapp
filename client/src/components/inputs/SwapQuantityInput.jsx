import PropTypes from "prop-types";

export default function SwapQuantityInput({ swapQuantity, tokenBalance, onChange, onMaxButtonClick }) {
    
  
    return (
    
        <div className="swapInput">
            <input type="number" min="0" name="" value={swapQuantity} onChange={onChange} max={tokenBalance} placeholder="Enter swap amount"/>
            <button onClick={onMaxButtonClick}>Max</button>
            <p>Balance : {tokenBalance}</p>
        </div>
  )
}

SwapQuantityInput.propTypes = {
    maxSwap: PropTypes.number.isRequired,
    swapQuantity: PropTypes.number.isRequired,
    tokenBalance: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onMaxButtonClick: PropTypes.func.isRequired
};