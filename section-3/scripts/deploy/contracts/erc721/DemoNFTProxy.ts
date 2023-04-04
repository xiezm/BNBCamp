import addresses from '../../../constants/addresses'
import { SupportedChainId } from '~/constants/chain'
import { isAddress } from 'ethers/lib/utils'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { DemoNFT, DemoNFT__factory, DemoNFTProxy, DemoNFTProxy__factory, DemoProxyAdmin, } from '../../../../typechain-types'

export async function deployDemoNFTProxy(
  chainId: SupportedChainId,
  signer: SignerWithAddress,
  demoNFT: DemoNFT,
  demoProxyAdmin: DemoProxyAdmin,
): Promise<DemoNFTProxy> {
  const contractProxyAddress = addresses.DemoNFTProxy[chainId]
  // 已存在
  if (isAddress(contractProxyAddress)) {
    const contractProxy = DemoNFTProxy__factory.connect(contractProxyAddress, signer)
    // 判断是否升级
    const proxyImplementation = await demoProxyAdmin.getProxyImplementation(contractProxy.address)
    if (proxyImplementation.toLowerCase() != demoNFT.address.toLowerCase()) {
      const result = await demoProxyAdmin.upgrade(contractProxy.address, demoNFT.address)
      console.log('DemoNFTProxy 升级逻辑合约 %s', JSON.stringify(result))
    }
    return contractProxy
  } else {
    const contractFactory = new DemoNFTProxy__factory(signer)
    const _data = DemoNFT__factory.createInterface().encodeFunctionData('initialize')
    const contract = await contractFactory.deploy(demoNFT.address, demoProxyAdmin.address, _data)
    console.log('DemoNFTProxy 部署合约 %s', contract.address)
    return await contract.deployed()
  }
}
