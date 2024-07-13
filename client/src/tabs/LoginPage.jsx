import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function LoginPage() {
  return (
    <div className="presentation">
        <div className="presentationText">
            <h3>
                Welcome Engineer ! We need your help !
            </h3>
            <p>The rocket to go to the moon can&apos;t drive by herself ! Complete quests to get fuel token and feed the engine NOW !</p>
            <p>Connect your wallet now to get started :</p>
            <div className="connectButton"><ConnectButton /></div>
        </div>
    </div>
  )
}
