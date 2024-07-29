import styles from "../../styles/Footer.module.css";


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="">
        <p>Made with ❤️ by <a href="https://github.com/quentin72000" target="_blank">quentin72000</a>.</p>
      </div>
      <div>
      <p>This DApp is <a href="https://github.com/quentin72000/tothemoon-dapp" target="_blank">Open Source</a> and run on the <a href="https://ternoa.network" target="_blank">Ternoa L2 zkEVM+ Testnet</a></p>
      </div>
        
    </footer>
  )
}
