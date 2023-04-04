import hre from 'hardhat'
import { SupportedChainId } from '~/constants/chain'

export function getChainId(): number {
  const chainId = hre.network.config.chainId
  if (chainId && chainId > 0) {
    if (chainId) {
      let exists = false
      Object.values(SupportedChainId).forEach((item) => {
        if (item === chainId) {
          exists = true
          return
        }
      })
      if (!exists) {
        throw new Error('network.config.chainId not support')
      }
    }
    return chainId
  } else {
    throw new Error('network.config.chainId is null')
  }
}
