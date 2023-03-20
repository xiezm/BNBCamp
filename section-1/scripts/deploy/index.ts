import { getChainId } from '~/utils/chain'
import { getSigner } from '~/utils/signer'
import { BEP20A, BEP20B, StakingRewards } from '~/constants/addresses'
import { deployBEP20 } from '~/deploy/contracts/bep20'
import { deployStakingRewards } from '~/deploy/contracts/staking-rewards'
import { AddressZero } from "@ethersproject/constants";

async function main() {
  const chainId = getChainId()
  const signer0 = await getSigner(0)
  console.log('signer0 = %s', signer0.address)
  //
  const currentSigner = signer0
  console.log('currentSigner = %s', currentSigner.address)
  //
  // bep20
  const bep20A = await deployBEP20(currentSigner, BEP20A[chainId], 'BEP20A', 'BEP20A', 18)
  const bep20B = await deployBEP20(currentSigner, BEP20B[chainId], 'BEP20B', 'BEP20B', 9)
  // staking-rewards
  const stakingRewards = await deployStakingRewards(currentSigner, StakingRewards[chainId], AddressZero, bep20A.address, bep20B.address)

  console.log('\n\n\n')
  console.log('############################## all contracts address')
  console.log('\n############################## BEP20A address = %s', bep20A.address)
  console.log('\n############################## BEP20B address = %s', bep20B.address)
  console.log('\n\n\n')
  console.log('\n############################## StakingRewards address = %s', stakingRewards.address)
  console.log('\n\n\n')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
