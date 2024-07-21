import { useReadContract, useBlockNumber } from "wagmi"
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { rocketContractConfig } from "../datas/contractConfig"

export default function AltitudeCounter(){

    const queryClient = useQueryClient();
    const { data: blockNumber } = useBlockNumber({ watch: true });


    const { data: altitude, error, isPending, queryKey } = useReadContract({
        ...rocketContractConfig,
        functionName: "currentAltitude",
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