import { useState } from "react";
import PropTypes from "prop-types";
import SwapQuantityInput from "../inputs/SwapQuantityInput";

export default function SwapForm({ onSubmit, disabled, tokenBalance }) {
    const [swapQuantity, setSwapQuantity] = useState('');

    const handleInputChange = (e) => {
        if(e.currentTarget.value === "") {
            setSwapQuantity("");
        } else if(parseInt(e.currentTarget.value) > tokenBalance) {
            setSwapQuantity(tokenBalance);
        }else {
            setSwapQuantity(parseInt(e.currentTarget.value));
        }
    }

    const handleMaxButtonClick = (e) => {
        e.preventDefault();
        setSwapQuantity(tokenBalance);
    }
    

    return (
        <div>
            <form action="" method="">
                <SwapQuantityInput tokenBalance={tokenBalance} swapQuantity={swapQuantity} onChange={handleInputChange} onMaxButtonClick={handleMaxButtonClick} />
                <button onClick={(e) => onSubmit(e, swapQuantity)} disabled={disabled}>Swap</button>
            </form>
        </div>
    )
}

SwapForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    tokenBalance: PropTypes.number.isRequired
};
