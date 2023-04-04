import { isAddress } from 'ethers/lib/utils'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { DemoProxyAdmin, DemoProxyAdmin__factory } from '../../../../typechain-types'
import addresses from '../../../constants/addresses'
import { SupportedChainId } from '~/constants/chain'

export async function deployDemoProxyAdmin(
  chainId: SupportedChainId,
  signer: SignerWithAddress
): Promise<DemoProxyAdmin> {
  const contractAddress = addresses.DemoProxyAdmin[chainId]
  //
  if (isAddress(contractAddress)) {
    return DemoProxyAdmin__factory.connect(contractAddress, signer)
  } else {
    const contractFactory = new DemoProxyAdmin__factory(signer)
    const contract = await contractFactory.deploy()
    return await contract.deployed()
  }
}
