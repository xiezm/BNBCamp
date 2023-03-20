import { BEP20A, BEP20B, StakingRewards } from '~/constants/addresses'
import console from 'console'
import { getSigner } from "~/utils/signer";
import { AddressZero } from "@ethersproject/constants";

const hre = require('hardhat')

async function main() {
  //
  const chainId = hre.network.config.chainId
  console.log('chainId = %s', chainId)


  const signer0 = await getSigner(0)
  console.log('signer0 = %s', signer0.address)

  //
  const currentSigner = signer0
  console.log('currentSigner = %s', currentSigner.address)

  // BEP20A
  const bep20AAddress = BEP20A[chainId]
  // await hre.run('verify:verify', {
  //   address: bep20AAddress,
  //   constructorArguments: ['BEP20A', 'BEP20A', 18],
  // })

  // BEP20B
  const bep20BAddress = BEP20B[chainId]
  // await hre.run('verify:verify', {
  //   address: bep20BAddress,
  //   constructorArguments: ['BEP20B', 'BEP20B', 9],
  // })

  // BEP20B
  const stakingRewardsAddress = StakingRewards[chainId]
  await hre.run('verify:verify', {
    address: stakingRewardsAddress,
    constructorArguments: [currentSigner.address, AddressZero, bep20AAddress, bep20BAddress],
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
