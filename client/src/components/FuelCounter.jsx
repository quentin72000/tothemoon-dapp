import { useAccount, useReadContract } from "wagmi"
import { fuelTokenContractConfig } from "../datas/contractConfig"

import wagmiConfig from "../datas/wagmiConfig"

export default function FuelCounter() {
    const { address } = useAccount(wagmiConfig);
    const { data, isPending } = useReadContract({
        ...fuelTokenContractConfig,
        functionName: "balanceOf",
        args: [address]
    })
    
    if(isPending){
        return <div>Loading...</div>
    }
    return (
        <p>You have {data.toString()/(10**18)} FUEL</p>
  )
}
