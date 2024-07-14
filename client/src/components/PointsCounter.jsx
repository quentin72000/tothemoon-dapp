import { useAccount, useReadContract } from "wagmi"
import { rocketContractConfig } from "../datas/contractConfig"
import wagmiConfig from "../datas/wagmiConfig"

export default function PointsCounter() {

    const { data, isPending } = useReadContract({
        ...rocketContractConfig,
        functionName: "points",
        args: [useAccount(wagmiConfig).address]
    })

    if(isPending){
        return "Loading..."
    }
    return (
        <p>You gained {data.toString()} points.</p>
  )
}
