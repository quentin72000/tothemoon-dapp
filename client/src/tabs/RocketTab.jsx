import AltitudeCounter from "../components/AltitudeCounter";
import FuelSelector from "../components/FuelSelector";
import Profile from "../components/Profile";
import rocketImage from "../assets/rocket.png"
import { useState } from "react";



export default function RocketTab() {
    const [selectedFuelAmount, setSelectedFuelAmount] = useState(1)

  return (
    <div>
      <AltitudeCounter/>
      <img src={rocketImage} className="rocket" width="200px" />
      <Profile />
      <FuelSelector selected={selectedFuelAmount} setSelected={setSelectedFuelAmount}/>
    </div>
  );
}
