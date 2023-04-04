import { SupportedChainId } from '~/constants/chain'

export type AddressMap = { [chainId: number]: string }

export const ProxyAdmin: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '',
  [SupportedChainId.GOERLI]: '',
  [SupportedChainId.LOCAL]: '',
}

export const DemoNFTLogic: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '',
  [SupportedChainId.GOERLI]: '',
  [SupportedChainId.LOCAL]: '',
}

export const DemoNFTProxy: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '',
  [SupportedChainId.GOERLI]: '',
  [SupportedChainId.LOCAL]: '',
}
