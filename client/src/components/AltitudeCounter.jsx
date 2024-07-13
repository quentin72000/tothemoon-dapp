
// import PropTypes from 'prop-types';
import { useAccount, useReadContract } from "wagmi"
import { rocketContractConfig } from "../datas/contractConfig"
import wagmiConfig from '../datas/wagmiConfig';


export default function AltitudeCounter(){

    const { data: altitude, error, isPending} = useReadContract({
        ...rocketContractConfig,
        functionName: "currentAltitude",
        // args: [useAccount(wagmiConfig).address]
    })
    console.log(isPending, useAccount(wagmiConfig).address)

    if (isPending) return <div>Loading...</div>

    if (error)
      return (
        <div>
          Error: {(error).shortMessage || error.message}
        </div>
      )
      console.log(altitude)
      if(altitude === 0n){
        return <p>Rocket has not lift-off yet.</p>
      }else {
        return <p>Rocket is at {altitude.toLocaleString()}km!</p> 
      }
    
    }

// AltitudeCounter.propTypes = {
//     altitude: PropTypes.number.isRequired
// };