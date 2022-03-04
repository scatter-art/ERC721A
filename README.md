<!-- ABOUT THE PROJECT -->

## About The Project

This contract is a fork of [Azuki's](https://twitter.com/azukizen) [ERC721A](https://github.com/chiru-labs/ERC721A) contract. This version allows you to pause and unpause sales, reveal and unreveal artwork, and customize parameters like token price, max number to mint, and max number in collection. It is currently optimized for PFP collections as opposed to 1/1s.

## About this guide

This guide assumes you have:

1. access to the linux command line
2. a working installation of [NodeJS](https://nodejs.org)
3. basic familiarity with basic CLI tools like `git`, `cd`, and `npm`
4. a text editor like VS Code

There are multiple steps involved in deploying this NFT contract:

1. Customize Flurks.sol in a text editor with your own values.
2. Deploy the contract to the Rinkeby test network in order to test.
3. After testing, deploy the contract to the Ethereum Mainnet.

In this guide we will use a Javascript command-line tool called Hardhat to deploy our contracts. Alternatively, you could simply modify the contract then paste it into a browser-based tool to deploy like [Remix IDE](https://remix.ethereum.org/).

## Setup

1. Clone this repo

- `git clone https://github.com/scatter-art/ERC721A.git`

2. Enter the directory

- `cd ERC721A`

3. Install dependencies

- `npm install`

4. Configure environment variables by creating a `.env` file at the root of the project (`ERC721A/.env`). The file should contain the following:

```
MAINNET_RPC_URL=https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161

RINKEBY_RPC_URL=https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161

ETHERSCAN_API_KEY=GDBRZ227RPV6YFG2QY1SCKE6IG3P7FG7R6

PRIVATE_KEY=123456789ABCDEFG

REPORT_GAS=true
```

Get your own RPC URLs by copy pasting the defaults found in Metamask > Settings > Networks, or by signing up for an account at [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/).

Get your own Etherscan API key from [Etherscan](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics).

### PRIVATE KEY

Since we will be using the command-line to deploy our contract (as opposed to Remix which uses the browser), we need to export it from Metamask first. To do so, [follow this guide](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

The private key is required to sign the deployment transaction using your wallet, and establish yourself as the owner of your contract.

It is worth repeating that anyone holding your private key has carte-blanche access to all assets in that account, so _be careful and do not share it with anyone_. That said, it is not a bad idea to start with a fresh Metamask wallet.

Once you have customized the above variables in your .env file, move to the next step.

## Editing

5. Customize `contracts/Flurks.sol` by replacing the Flurks data with your own values. You need to modify the following parameters using a text editor:

- filename
- contract name on line 10
- `notRevealedUri` on line 18
- `tokenPrice` on line 20
- `maxNfts` on line 21
- `maxBatchSize` on line 22
- the name and symbol in the constructor on line 24

Note: `notRevealedUri` is an IPFS or http link to your unrevealed artwork placeholder. Don't worry if you don't have that art uploaded yet, we can modify this value at any time using the `setNotRevealedURI` method. In other words, we can deploy the contract without it.

After you have made those customizations we need to customize the deployment script.

6. Customize `scripts/deploy.js`. The only parameter which needs to be modified here is 'Flurks' on line 11. Change it to:

```
  const NFT = await ethers.getContractFactory('MyCollectionName');
```

to match the contract name value you set on line 10 in the contract:

```
contract MyCollectionName is ERC721A, Ownable {
```

7. Compile the contract by running `npm run compile` (which is an alias for `hardhat compile`). This will identify any errors in your code. You will need to resolve those before moving to the next step.

## Deployment

8. Load some Rinkeby ETH in your Metamask wallet. Deploying our contract to testnet requires some Rinkeby ETH, aka Monopoly money. You can obtain some for free here: https://faucets.chain.link/rinkeby. To confirm whether you have any ETH balance on Rinkeby, change to the Rinkeby network on Metamask with the desired wallet. You don't need very much to deploy since everything is cheaper on testnet.

9. Deploy your NFT contract to Rinkeby test network. Do this by running `npm run deploy:test` (which is an alias of `hardhat run --network rinkeby ./scripts/deploy.js`). If all goes well you'll see a confirmation message like this:

```
$ npm run deploy:test

> erc721a@3.0.0 deploy:test
> hardhat run --network rinkeby ./scripts/deploy.js

NFT Contract deployed to: 0xc9709E1f5f46567e8eE7A0FC40D5092ADB5abE41
Nothing to compile
Compiling 1 file with 0.8.4
Successfully submitted source code for contract
contracts/Flurks.sol:Flurks at 0xc9709E1f5f46567e8eE7A0FC40D5092ADB5abE41
for verification on the block explorer. Waiting for verification result...

Successfully verified contract Flurks on Etherscan.
https://rinkeby.etherscan.io/address/0xc9709E1f5f46567e8eE7A0FC40D5092ADB5abE41#code
```

Verification should take a couple minutes.

10. Your contract is now deployed and verified on Rinkeby testnet. You can visit and interact with it here: https://rinkeby.etherscan.io/address/{your contract address goes here}, eg. https://rinkeby.etherscan.io/address/0xc9709E1f5f46567e8eE7A0FC40D5092ADB5abE41.

From the WriteContract tab, you can start by unpausing the sale then minting yourself some NFTs.

11. Deploying to Mainnet is pretty much the same process, you just have to change the network flag during deployment and make sure you have enough real ETH in the same wallet. Contact us before doing so, so we can double-check everything works well on Rinkeby first.
