import AltitudeCounter from "../components/AltitudeCounter";
import FuelSelector from "../components/FuelSelector";
import Profile from "../components/Profile";
import rocketImage from "../assets/rocket.png"
import { useState } from "react";



export default function RocketTab() {
    const [altitude, setAltitude] = useState(0)

  return (
    <div>
      <AltitudeCounter altitude={altitude} />
      <img src={rocketImage} alt="" onClick={() => setAltitude(altitude + 1)} width="200px" />
      <Profile />
      <FuelSelector />
    </div>
  );
}
