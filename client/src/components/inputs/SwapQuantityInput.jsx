import PropTypes from "prop-types";

import styles from "../../styles/SwapQuantitiyInput.module.css";

export default function SwapQuantityInput({ swapQuantity, tokenBalance, onChange, onMaxButtonClick }) {
    
  
    return (
        <div className={styles.container}>
            <div className={styles.inputDiv}>
                <input className={styles.input} type="number" min="0" name="" value={swapQuantity} onChange={onChange} max={tokenBalance} placeholder="Enter swap amount"/>
            </div>
            <div className={styles.info}>
                <button onClick={onMaxButtonClick}>Max</button>
                <p>Balance : {tokenBalance}</p>
            </div>

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