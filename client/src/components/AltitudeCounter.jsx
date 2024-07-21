
// import PropTypes from 'prop-types';
import { useReadContract, useBlockNumber } from "wagmi"
import { rocketContractConfig } from "../datas/contractConfig"
// import wagmiConfig from '../datas/wagmiConfig';
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


export default function AltitudeCounter(){

    const queryClient = useQueryClient();
    const { data: blockNumber } = useBlockNumber({ watch: true });


    const { data: altitude, error, isPending, queryKey } = useReadContract({
        ...rocketContractConfig,
        functionName: "currentAltitude",
        // args: [useAccount(wagmiConfig).address]
    })

    useEffect(() => {
      queryClient.invalidateQueries({ queryKey });
    }, [blockNumber, queryClient, queryKey]);
  

    if (isPending) return <div>Loading...</div>

    if (error)
      return (
        <div>
          Error: {(error).shortMessage || error.message}
        </div>
      )
      if(altitude === 0n){
        return <p>Rocket has not lift-off yet.</p>
      }else {
        return <p>Rocket is at {altitude.toLocaleString()}km!</p> 
      }
    
    }

// AltitudeCounter.propTypes = {
//     altitude: PropTypes.number.isRequired
// };