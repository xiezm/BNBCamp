import addresses from '~/constants/addresses'
import console from 'console'
import { getSigner } from "~/utils/signer";
import { AddressZero } from "@ethersproject/constants";
import { DemoNFT__factory } from "../../typechain-types";

const hre = require('hardhat')

async function main() {
  //
  const chainId = hre.network.config.chainId
  console.log('chainId = %s', chainId)


  const signer0 = await getSigner(0)
  console.log('signer0 = %s', signer0.address)

  //
  const currentSigner = signer0
  console.log('currentSigner = %s', currentSigner.address)

  //【DemoProxyAdmin】
  const DemoProxyAdminAddress = addresses.DemoProxyAdmin[chainId]
  // await hre.run('verify:verify', {
  //   address: DemoProxyAdminAddress,
  //   constructorArguments: [],
  // })

  //【DemoNFTLogic】
  const DemoNFTLogicAddress = addresses.DemoNFTLogic[chainId]
  await hre.run('verify:verify', {
    address: DemoNFTLogicAddress,
  })

  //【DemoNFTProxy】
  const DemoNFTProxyAddress = addresses.DemoNFTProxy[chainId]
  // const _data = DemoNFT__factory.createInterface().encodeFunctionData('initialize')
  // console.log(' DemoNFTProxy data = %s', _data)
  // await hre.run('verify:verify', {
  //   address: DemoNFTProxyAddress,
  //   constructorArguments: [DemoNFTLogicAddress, DemoProxyAdminAddress, _data],
  // })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
