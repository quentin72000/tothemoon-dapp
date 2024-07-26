import { useAccount } from "wagmi"

import { ConnectButton } from "@rainbow-me/rainbowkit";

import wagmiConfig from "../../datas/wagmiConfig"

export default function Header() {
  const { isConnected } = useAccount(wagmiConfig);
  
  return (
    <header className="header">
        <h1 className="title">TO THE MOON</h1>
        {isConnected && <div className="connectButtonHeader"><ConnectButton/></div>}
    </header>
  )
}
