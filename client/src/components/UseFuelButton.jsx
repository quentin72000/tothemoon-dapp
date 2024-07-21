import rocketImage from "../assets/rocket.png"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { ethers } from "ethers";

import wagmiConfig from "../datas/wagmiConfig"
import { fuelTokenContractConfig, rocketContractConfig } from "../datas/contractConfig"

import { toast } from "react-hot-toast"


import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from "react";

export default function UseFuelButton({ selectedFuelAmount }) {

  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount(wagmiConfig);

  const { data : allowance, refetch : refetchAllowance, } = useReadContract({
    ...fuelTokenContractConfig,
    functionName: "allowance",
    args: [ address, rocketContractConfig.address],
  })


  // Configurer et écrire l'approbation
  const { writeContract: approve, data: approveData, isError: isApproveError, error: errorApprove, isPending: isApprovePending/*, reset */  } = useWriteContract();

  // Suivre la transaction d'approbation
  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess  } = useWaitForTransactionReceipt({
    hash: approveData
  });

  // Configurer et écrire l'appel de la fonction du contrat cible
  const { writeContract: callGiveFuelRocket, data: giveFuelData, isError: isErrorGiveFuel, error: errorGiveFuel, isPending: isGiveFuelPending } = useWriteContract({
    ...rocketContractConfig,
    functionName: 'giveFuel',
    args: [ethers.parseUnits(selectedFuelAmount.toString(), 18)]
  });

  // Suivre la transaction du contrat cible
  const { isLoading: isTargetFunctionLoading, isSuccess: isTargetFunctionSuccess } = useWaitForTransactionReceipt({
    hash: giveFuelData
  });

  const handleGiveFuel = useCallback(() => {
    callGiveFuelRocket({
      ...rocketContractConfig,
      functionName: 'giveFuel',
      args: [ethers.parseUnits(selectedFuelAmount.toString(), 18)]
    });
  }, [callGiveFuelRocket, selectedFuelAmount]);

  useEffect(() => {
    if (isApproveSuccess && isLoading && allowance < ethers.parseUnits('1000', 18)) {
      handleGiveFuel();
      refetchAllowance();
    }
  }, [isApproveSuccess, handleGiveFuel, refetchAllowance, isLoading, allowance]);

  const handleButtonClick = async () => {
    setIsLoading(true);

    if (allowance !== undefined && allowance < (ethers.parseUnits('1000', 18))) {
      approve({
        ...fuelTokenContractConfig,
        functionName: 'approve',
        args: [rocketContractConfig.address, ethers.parseUnits('1000',18).toString()]
      });
    } else {
      handleGiveFuel();
    }
  };

  // Display a toast message when the target giveFuel function status changes
  useEffect(() => {
    if (isTargetFunctionSuccess) {
      toast.success('Fuel has been used successfully!', {id: "fuel"});
      setIsLoading(false);
    }else if (isErrorGiveFuel){ 
      toast.error(`Error: ${errorGiveFuel.shortMessage}`, {id: "fuel"});
      console.error(errorGiveFuel);
      setIsLoading(false);
    } else if (isTargetFunctionLoading) {
      toast.loading('Executing...', {id: "fuel"});
    } else if(isGiveFuelPending){
      toast.loading('Waiting for transaction confirmation...', {id: "fuel"});
    }
  }, [isTargetFunctionSuccess, isLoading, isErrorGiveFuel, errorGiveFuel, isTargetFunctionLoading, isGiveFuelPending]);

  // Display a toast message when approval status changes
  useEffect(() => {
    if (isApproveSuccess) {
      toast.success('Approval has been successful!', {id: "approve"});
    } else if (isApproveError) {
      toast.error(`Error: ${errorApprove.shortMessage}`, {id: "approve"});
      console.error(errorApprove);
      setIsLoading(false);
    } else if (isApproveLoading) {
      toast.loading('Approving...', {id: "approve"});
    } else if (isApprovePending) {
      toast.loading('Waiting for transaction confirmation...', {id: "approve"});
    }
  }, [isApproveSuccess, isApproveLoading, isApproveError, isApprovePending, errorApprove]);

  return (
    <div>
      <input className="rocket" type="image" src={rocketImage} alt="" onClick={handleButtonClick} disabled={isLoading || isApproveLoading || isTargetFunctionLoading} width="200px"/>
      <p>{isLoading || isApproveLoading || isTargetFunctionLoading ? 'Loading...' : 'Execute'}</p>
    </div>
  )
}

UseFuelButton.propTypes = {
  selectedFuelAmount: PropTypes.number.isRequired,
};