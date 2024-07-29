import { useState } from "react";

import AltitudeCounter from "../components/AltitudeCounter";
import FuelSelector from "../components/buttons/FuelSelector";
import Profile from "../components/layouts/Profile";
import UseFuelButton from "../components/buttons/UseFuelButton";
import { useAccount, useReadContracts } from "wagmi";
import { fuelTokenContractConfig, rocketContractConfig } from "../datas/contractConfig";
import wagmiConfig from "../datas/wagmiConfig";
import WatchTokenButton from "../components/buttons/WatchTokenButton";



export default function RocketTab() {
  const [selectedFuelAmount, setSelectedFuelAmount] = useState(1)

  const { address } = useAccount(wagmiConfig);

  const { data, isPending } = useReadContracts({
      contracts: [{
        ...fuelTokenContractConfig,
        functionName: "balanceOf",
        args: [address]
      },
      {
        ...rocketContractConfig,
        functionName: "points",
        args: [address]
      }]
    })
    const [ fuelData, pointsData ] = data || [{}, {}];
    console.log("fuelData", fuelData)

  return (
    <div>
      <AltitudeCounter/> 
      <UseFuelButton selectedFuelAmount={selectedFuelAmount} fuelQuantityData={fuelData}/>
      {isPending ? <div>Loading...</div> : <Profile fuelQuantityData={fuelData} pointsData={pointsData}/>}
      <FuelSelector selected={selectedFuelAmount} setSelected={setSelectedFuelAmount} options={[1, 10, 100, 1000]}/>
      <WatchTokenButton tokenAddress={fuelTokenContractConfig.address} tokenSymbol={"FUEL"}/>
    </div>
  );
}
