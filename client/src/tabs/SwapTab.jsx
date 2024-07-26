
import { useAccount, useReadContract } from "wagmi";
import { useState } from "react";

import TokenCounter from "../components/TokenCounter";
import SwapForm from "../components/forms/SwapForm"

import { tokenContractConfig } from "../datas/contractConfig";
import wagmiConfig from "../datas/wagmiConfig";

import toast from "react-hot-toast";
import { ethers } from "ethers";


export default function SwapTab() {
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount(wagmiConfig);
  const { data: tokenBalance, isPending } = useReadContract({
      ...tokenContractConfig,
      functionName: "balanceOf",
      args: [address]
  })

  const handleSwap = (e, swapQuantity) => {
    setIsLoading(true);
    e.preventDefault();
    if(swapQuantity === undefined || isPending) return;
    if(ethers.parseUnits(swapQuantity.toString(), 18) > tokenBalance) {
        toast.error("You don't have enough $CTTM to swap", {id: "swap"});
        return;
    }
    setIsLoading(false);
}

  return (
    <div>
        <SwapForm onSubmit={handleSwap} disabled={isPending || isLoading} tokenBalance={tokenBalance ? parseFloat(ethers.formatUnits(tokenBalance, 18)) : 0}/>
        <div>{isLoading ? "true": "false"}</div>
    </div>
  )
}
