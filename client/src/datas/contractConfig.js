import tokenAbi from "./abi/Token.json"
import rocketAbi from "./abi/Rocket.json"
import fuelTokenAbi from "./abi/FuelToken.json";


export const tokenContractConfig = {
    abi: tokenAbi,
    address: '0x4489A23120990AdBcDce4766389607c7C37C25b4'
}

export const rocketContractConfig = {
    abi: rocketAbi,
    // address: "0xEAA3c9C4182Bd1ce3F0152842f6d7A91EA3097b8"
    address: '0x8c024Cd2b2a3307685dF2f9fC041165Daa84F341'
}


export const fuelTokenContractConfig = {
    abi: fuelTokenAbi,
    address: '0xC79868A596F426B0898056c6e4F2D454B7725d88'
}