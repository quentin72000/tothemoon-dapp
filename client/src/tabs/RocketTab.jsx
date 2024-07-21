import { useState } from "react";

import AltitudeCounter from "../components/AltitudeCounter";
import FuelSelector from "../components/FuelSelector";
import Profile from "../components/Profile";
import UseFuelButton from "../components/UseFuelButton";



export default function RocketTab() {
  const [selectedFuelAmount, setSelectedFuelAmount] = useState(1)

  return (
    <div>
      <AltitudeCounter/> 
      <UseFuelButton selectedFuelAmount={selectedFuelAmount}/>
      <Profile />
      <FuelSelector selected={selectedFuelAmount} setSelected={setSelectedFuelAmount}/>
    </div>
  );
}
