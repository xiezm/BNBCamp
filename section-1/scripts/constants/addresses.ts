import { SupportedChainId } from '~/constants/chain'

export type AddressMap = { [chainId: number]: string }

export const BEP20A: AddressMap = {
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSC_TEST]: '0x87eC26C59454d2ff9D2d8fa3D64dDe0a8f26127f',
}

export const BEP20B: AddressMap = {
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSC_TEST]: '0xb982a28d74b3C19BDb807962339d6F0Ca96B253E',
}

export const StakingRewards: AddressMap = {
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSC_TEST]: '0x9Cb28Be8Cc2BD66568Ba0072BC94179FBc6d81DC',
}
