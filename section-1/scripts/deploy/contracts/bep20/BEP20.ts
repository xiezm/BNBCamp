import { isAddress } from 'ethers/lib/utils'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { BEP20, BEP20__factory } from '../../../../typechain-types'

export async function deployBEP20(signer: SignerWithAddress, contractAddress: string, name: string, symbol: string, decimals: number): Promise<BEP20> {
  if (isAddress(contractAddress)) {
    return BEP20__factory.connect(contractAddress, signer)
  } else {
    const contractFactory = new BEP20__factory(signer)
    const contract = await contractFactory.deploy(name, symbol, decimals)
    return await contract.deployed()
  }
}
