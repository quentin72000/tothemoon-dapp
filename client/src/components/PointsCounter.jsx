import { useAccount, useReadContract } from "wagmi"
import { rocketContractConfig } from "../datas/contractConfig"

import wagmiConfig from "../datas/wagmiConfig"

export default function PointsCounter() {
    const { address } = useAccount(wagmiConfig);
    const { data, isPending } = useReadContract({
        ...rocketContractConfig,
        functionName: "points",
        args: [address]
    });

    if(isPending){
        return <div>Loading...</div>
    }
    return (
        <p>You gained {data.toString()} points.</p>
  )
}
