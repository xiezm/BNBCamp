import addresses from '../../../constants/addresses'
import { SupportedChainId } from '~/constants/chain'
import { isAddress } from 'ethers/lib/utils'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { DemoNFT, DemoNFT__factory } from '../../../../typechain-types'

export async function deployDemoNFT(chainId: SupportedChainId, signer: SignerWithAddress): Promise<DemoNFT> {
  const contractAddress = addresses.DemoNFTLogic[chainId]
  // 已存在
  if (isAddress(contractAddress)) {
    return DemoNFT__factory.connect(contractAddress, signer)
  } else {
    const contractFactory = new DemoNFT__factory(signer)
    const contract = await contractFactory.deploy()
    return await contract.deployed()
  }
}
