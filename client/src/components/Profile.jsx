import { useAccount, useReadContract } from "wagmi"
import { tokenContractConfig } from "../datas/contractConfig"
import wagmiConfig from '../datas/wagmiConfig';

export default function Profile() {
    const { data: balance, error, isPending} = useReadContract({
        ...tokenContractConfig,
        functionName: "balanceOf",
        args: [useAccount(wagmiConfig).address]
    })
    console.log(isPending, useAccount(wagmiConfig).address)

    if (isPending) return <div>Loading...</div>

    if (error)
      return (
        <div>
          Error: {(error).shortMessage || error.message}
        </div>
      )
  
  
    return <div>You currently have {balance.toString()/(10**18)} $CTTM</div>
}
