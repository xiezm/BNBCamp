import { SupportedChainId } from '~/constants/chain'

export interface ChainIdNameMap {
  readonly chainId: number
  readonly name: string
}

export const CHAIN_ID_NAME_MAP: ChainIdNameMap[] = [
  { chainId: 56, name: 'BSC' },
  { chainId: 97, name: 'BSCTest' },
]

export const getChainNameById = (chainId?: SupportedChainId | null): string | undefined | null => {
  const chainIdNameMap = CHAIN_ID_NAME_MAP.find((i) => i.chainId == chainId)
  return chainIdNameMap?.name
}
