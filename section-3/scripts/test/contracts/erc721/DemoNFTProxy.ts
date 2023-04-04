import { getSigner } from '~/utils/signer'
import { SupportedChainId } from "~/constants/chain";
import { DemoNFT__factory } from "../../../../typechain-types";
import addresses from "~/constants/addresses";

export async function testDemoNFT(chainId: SupportedChainId) {
  //
  const signer0 = await getSigner(0)  // 0x14F2D633dcE422c96aC3B936e068970dc8bd500d
  const signer1 = await getSigner(1)  // 0x878162c6170Db5eF7d175cE1a8F7c819833d755A
  //
  const currentAccount = signer0
  //
  console.log('\n\n\n')
  console.log('当前账户地址 = %s', currentAccount.address)
  //
  const demoNFT = await DemoNFT__factory.connect(addresses.DemoNFTProxy[chainId], currentAccount)
  //
  console.log('\n\n\n')
  
  //铸造
  const mintResult = await demoNFT.mint(currentAccount.address)
  console.log('\n单个铸造 = %s', JSON.stringify(mintResult))

  //批量铸造
  const batchMintResult = await demoNFT.batchMint([currentAccount.address, signer0.address])
  console.log('\n批量铸造 presale = %s', JSON.stringify(batchMintResult))

  console.log('\n\n\n调用升级逻辑合约后函数')
  const setDefaultRoyaltyResult = await demoNFT.setDefaultRoyalty(currentAccount.address, 125)
  console.log('合约管理员-设置版税 = %s', JSON.stringify(setDefaultRoyaltyResult))

  const royaltyInfoResult = await demoNFT.royaltyInfo("1", 10000)
  console.log('\n查询版税信息 = %s', JSON.stringify(royaltyInfoResult))

  const frozenTokenIdResult = await demoNFT.frozenTokenId("2")
  console.log('冻结NFT = %s', JSON.stringify(frozenTokenIdResult))

  const unfreezeTokenIdResult = await demoNFT.unfreezeTokenId("2")
  console.log('\n解冻NFT = %s', JSON.stringify(unfreezeTokenIdResult))

}
