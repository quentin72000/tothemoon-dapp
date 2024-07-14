
import "./App.css"

import { useState } from "react"

import NavBar from "./components/NavBar"
import RocketTab from "./tabs/RocketTab"
import LoginTab from "./tabs/LoginTab"
import { useAccount, /*useAccountEffect*/ } from "wagmi"
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
            case 4:
                return <div>Admin Page : Restricted (SOON)</div>
            default:
                return <RocketTab/>;
        }
    }

    // Old way to check account status
    // useAccountEffect({
    //     config: wagmiConfig,
    //     onConnect: () => setConnected(true),
    //     onDisconnect: () => setConnected(false)
    // })

    const { isConnected } = useAccount(wagmiConfig);

  
  
    return (
        <>
            <Header/>

            <NavBar onClick={(tabId) => setTabId(tabId)}/>
            { !isConnected ? <LoginTab/> : renderTab()}
            <Footer/>
        </>
  )
}
