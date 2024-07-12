import { defineChain } from 'viem'

export default defineChain({
  id: 752024,
  name: 'Ternoa zkEVM+ Testnet',
  nativeCurrency: { name: 'Capsule Coin', symbol: 'CAPS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.zkevm.ternoa.network'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.zkevm.ternoa.network' },
  },
})