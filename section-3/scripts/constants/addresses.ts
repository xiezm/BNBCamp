import { SupportedChainId } from '~/constants/chain'

export type AddressMap = { [chainId: number]: string }

const DemoProxyAdmin: AddressMap = {
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSC_TEST]: '0xCA92Dc77158387508fa0b3EC19ceEAc7ee86Ce1B',
}

const DemoNFTLogic: AddressMap = {
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSC_TEST]: '0xa145b55A9505FEEB751bB573210bbe591c832D55',
}

const DemoNFTProxy: AddressMap = {
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSC_TEST]: '0xB2110D5Dd6983b3f311792c8d92c8ac26A378Cc3',
}

export default {
  DemoProxyAdmin,
  DemoNFTLogic,
  DemoNFTProxy,
}
