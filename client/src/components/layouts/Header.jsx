import { useAccount } from "wagmi"

import { ConnectButton } from "@rainbow-me/rainbowkit";

import wagmiConfig from "../../datas/wagmiConfig"

import styles from "../../styles/Header.module.css";

export default function Header() {
  const { isConnected } = useAccount(wagmiConfig);
  
  return (
    <header className={styles.header}>
        <h1 className={styles.title}>TO THE MOON</h1>
        {isConnected && <div className={styles.connectButton}><ConnectButton/></div>}
    </header>
  )
}
