import { useAccount } from "wagmi"
import wagmiConfig from "../datas/wagmiConfig"
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {

    const { isConnected } = useAccount(wagmiConfig);
  return (
    <div className="header">
        <h1 className="title">TO THE MOON</h1>
        {isConnected && <div className="connectButtonHeader"><ConnectButton/></div>}
    </div>
  )
}
