import { isAddress } from 'ethers/lib/utils'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { StakingRewards, StakingRewards__factory } from '../../../../typechain-types'

export async function deployStakingRewards(signer: SignerWithAddress, contractAddress: string, _rewardsDistribution: string, _rewardsToken: string, _stakingToken: string): Promise<StakingRewards> {
  if (isAddress(contractAddress)) {
    return StakingRewards__factory.connect(contractAddress, signer)
  } else {
    const contractFactory = new StakingRewards__factory(signer)
    const contract = await contractFactory.deploy(signer.address, _rewardsDistribution, _rewardsToken, _stakingToken)
    return await contract.deployed()
  }
}
