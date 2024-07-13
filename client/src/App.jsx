
import "./App.css"

import { useState } from "react"

import NavBar from "./components/NavBar"
import RocketTab from "./tabs/RocketTab"
import LoginPage from "./tabs/LoginPage"
import { useAccount } from "wagmi"
import wagmiConfig from "./datas/wagmiConfig"
import Footer from "./components/Footer"
import Header from "./components/Header"

export default function App() {
    const [tabId, setTabId] = useState(2)

    function renderTab(){
        switch (tabId) {
            case 1:
                return <div>Swap : SOON</div>
            case 2:
                return <RocketTab/>
            case 3:
                return <div>Quests: SOON</div>
        
            default:
                break;
        }
    }

    const { isConnected } = useAccount(wagmiConfig);
    console.log(isConnected)

  
  
    return (
        <>
            <Header/>

            <NavBar onClick={(tabId) => setTabId(tabId)}/>
            { !isConnected ? <LoginPage/> : renderTab()}
            <Footer/>
        </>
  )
}
