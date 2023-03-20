import { BEP20A, BEP20B } from '~/constants/addresses'
import console from 'console'

const hre = require('hardhat')

async function main() {
  //
  const chainId = hre.network.config.chainId

  console.log('chainId = %s', chainId)

  // 【BEP20A】
  const bep20AAddress = BEP20A[chainId]
  await hre.run('verify:verify', {
    address: bep20AAddress,
    constructorArguments: ['BEP20A', 'BEP20A', 18],
  })

  // 【BEP20B】
  const bep20BAddress = BEP20B[chainId]
  await hre.run('verify:verify', {
    address: bep20BAddress,
    constructorArguments: ['BEP20B', 'BEP20B', 9],
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
