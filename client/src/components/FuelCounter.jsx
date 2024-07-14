import { useAccount, useReadContract } from "wagmi"
import wagmiConfig from "../datas/wagmiConfig"
import { fuelTokenContractConfig } from "../datas/contractConfig"

export default function FuelCounter() {
    const { data, isPending } = useReadContract({
        ...fuelTokenContractConfig,
        functionName: "balanceOf",
        args: [useAccount(wagmiConfig).address]
    })
    
    if(isPending){
        return "Loading..."
    }
    return (
        <p>You have {data.toString()/(10**18)} FUEL</p>
  )
}
