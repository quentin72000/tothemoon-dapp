# To The Moon
## Description
To The Moon is a little web3 community game originally created for the Ternoa L2 ZKEVM testnet. The goal is to give enough fuel to a rocket to reach the moon.The rocket is controlled by a smart contract and the fuel token is an ERC20 SC. It also use the CapsToTheMoon ERC20 token as a way to swap to Fuel.

The game is a simple example of how a community can interact with a smart contract to achieve a common goal. The game is open-source and can be used as a template for other community games.

## How to play
1. Connect your wallet
2. Do quests to earn CapsToTheMoon tokens
3. Swap CapsToTheMoon tokens for Fuel tokens
4. Send Fuel tokens to the rocket smart contract
5. Watch the rocket fly to the moon

Wallet who will have made move the rocket the will be the winner of the game.

## How to deploy
### 1. Clone the repository
```bash
git clone https://github.com/quentin72000/tothemoon-dapp.git
cd tothemoon-dapp
```
### 2. Deploy the Smart Contract
2.1 Install the dependencies
```bash
cd contracts
npm install
```
2.2 Compile the smart contract and check for errors
```bash
npx hardhat compile
```
2.3 Configure your private key into hardhat variables
> [!WARNING]  
> If deploying on a testnet, make sure to use an account with no real funds.
```bash
npx hardhat vars set TERNOA_PRIVATE_KEY
# Enter your hexadecimal private key
```

2.3 Modify the deployment script
Open the `contracts/ignition/modules/Rocket.js` file and modify the constant. TOKEN_ADDRESS should be the address of the ERC20 token you want to use as swap token.

2.4 Deploy the smart contract
```bash
npx hardhat ignition deploy ./ignition/modules/Rocket.js --network ternoa
```

### 3. Configure the frontend with the smart contract address
SOON
### 4. Deploy the Frontend
SOON
### 5. Enjoy

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

