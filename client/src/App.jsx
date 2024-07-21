
import "./App.css"

import { useEffect, useState } from "react"
import { useChainModal } from "@rainbow-me/rainbowkit"
import { useAccount, /*useAccountEffect*/ } from "wagmi"

import NavBar from "./components/NavBar"
import RocketTab from "./tabs/RocketTab"
import LoginTab from "./tabs/LoginTab"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"

import ternoaChain from "./datas/ternoaChain"
import wagmiConfig from "./datas/wagmiConfig"

export default function App() {
    const [tabId, setTabId] = useState(2)


    const { openChainModal, chainModalOpen } = useChainModal();

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
    const { chainId } = useAccount(wagmiConfig);
    console.log("chainID", chainId)

    useEffect(() => {
        console.log("isOpen", chainModalOpen)
        if(isConnected && chainId != ternoaChain.id && !chainModalOpen){
            setTimeout(openChainModal, 0)
        }        
    }, [chainId, isConnected, openChainModal, chainModalOpen])

  
  
    return (
        <>
            <Header/>

            <NavBar onClick={(tabId) => setTabId(tabId)}/>
            { !isConnected ? <LoginTab/> : renderTab()}
            <Toaster position="bottom-left"/>
            <Footer/>
        </>
  )
}
