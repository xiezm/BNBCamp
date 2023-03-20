import hre from 'hardhat'

export async function getSigner(index: number = 0) {
  const signers = await hre.ethers.getSigners()
  //console.debug('##############################signers = %s', JSON.stringify(signers))
  return signers[index]
}
