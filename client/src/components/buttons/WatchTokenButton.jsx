import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useWatchAsset } from 'wagmi'
import PropTypes from 'prop-types';

export default function WatchTokenButton ({ tokenAddress, tokenSymbol, entireDisplay = true }) {
    const { watchAsset, isError } = useWatchAsset();

    const handleButton = () => {
        watchAsset({
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: 18,
            },
        })
    }

    useEffect(() => {
        if(isError){
            toast.error("Error while watching the token", tokenSymbol)
        }
    }, [isError, tokenSymbol])
    return (
        <button onClick={handleButton}>Add ${tokenSymbol}{entireDisplay && "to wallet"}</button>
    )
}

WatchTokenButton.propTypes = {
    tokenAddress: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    entireDisplay: PropTypes.bool
}