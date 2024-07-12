import { ConnectButton } from "@rainbow-me/rainbowkit"
import AltitudeCounter from "./components/AltitudeCounter"
import Profile from "./components/Profile"
import FuelSelector from "./components/FuelSelector"

import "./App.css"

import { useState } from "react"

import rocketImage from "./assets/rocket.png"

export default function App() {
    const [altitude, setAltitude] = useState(0)
  
  
    return (
        <>
            <ConnectButton/>
            <AltitudeCounter altitude={altitude} />
            <img src={rocketImage} alt="" onClick={() => setAltitude(altitude+1)} />
            <Profile/>
            <FuelSelector/>
        </>
  )
}
