import { getChainId } from '~/utils/chain'
import { testDemoNFT } from "~/test/contracts/erc721/DemoNFTProxy";

async function main() {
  const chainId = getChainId()
  //
  await testDemoNFT(chainId)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
