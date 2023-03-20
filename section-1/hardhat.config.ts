import * as dotenv from 'dotenv'

import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@nomiclabs/hardhat-web3'
import { HardhatUserConfig } from 'hardhat/config'
import 'tsconfig-paths/register'
import fs from 'fs'

dotenv.config()

const scanApiKey = process.env.SCAN_API_KEY as string;

const config: HardhatUserConfig = {
  defaultNetwork: 'bscTestnet',
  networks: {
    bscTestnet: {
      url: 'https://data-seed-prebsc-2-s3.binance.org:8545',
      accounts: fs.readFileSync('.private-key-bscTestnet').toString().trim().split('\n'),
      chainId: 97,
    },
  },
  solidity: {
    settings: {
      metadata: {
        bytecodeHash: 'none',
      },
    },
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 30000,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      bscTestnet: `${scanApiKey}`,
    },
  },
  mocha: {
    timeout: 40000,
  },
}

export default config
