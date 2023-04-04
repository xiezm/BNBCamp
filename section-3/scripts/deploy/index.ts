import { getChainId } from '~/utils/chain'
import { getSigner } from '~/utils/signer'
import { BEP20A, BEP20B, StakingRewards } from '~/constants/addresses'
import { deployBEP20 } from '~/deploy/contracts/bep20'
import { deployStakingRewards } from '~/deploy/contracts/staking-rewards'
import { AddressZero } from "@ethersproject/constants";
import { deployDemoProxyAdmin } from "~/deploy/contracts/proxy-admin/DemoProxyAdmin";

async function main() {
  const chainId = getChainId()
  const signer0 = await getSigner(0)
  console.log('signer0 = %s', signer0.address)
  //
  const currentSigner = signer0
  console.log('currentSigner = %s', currentSigner.address)
  //
  // ProxyAdmin
  const demoProxyAdmin = await deployDemoProxyAdmin(chainId, signer0)
  // DemoNFT
  const demoNFTLogic = await deployDemoNFT(chainId, signer0)
  // DemoNFTProxy
  const demoNFTProxy = await deployDemoNFTProxy(
    chainId,
    signer0,
    demoNFTLogic,
    demoProxyAdmin
  )

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
