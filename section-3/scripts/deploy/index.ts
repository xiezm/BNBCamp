import { getChainId } from '~/utils/chain'
import { getSigner } from '~/utils/signer'
import { deployDemoProxyAdmin } from "~/deploy/contracts/proxy-admin/DemoProxyAdmin";
import { deployDemoNFT } from "~/deploy/contracts/erc721/DemoNFT";
import { deployDemoNFTProxy } from "~/deploy/contracts/erc721/DemoNFTProxy";

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
  const demoNFT = await deployDemoNFT(chainId, signer0)
  // DemoNFTProxy
  const demoNFTProxy = await deployDemoNFTProxy(
    chainId,
    signer0,
    demoNFT,
    demoProxyAdmin
  )

  console.log('\n\n\n')
  console.log('############################## all contracts address')
  console.log('\n############################## DemoProxyAdmin address = %s', demoProxyAdmin.address)
  console.log('\n############################## DemoNFTLogic address = %s', demoNFT.address)
  console.log('\n\n\n')
  console.log('\n############################## DemoNFTProxy address = %s', demoNFTProxy.address)
  console.log('\n\n\n')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
