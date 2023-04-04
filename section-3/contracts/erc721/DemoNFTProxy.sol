// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract DemoNFTProxy is TransparentUpgradeableProxy {

    constructor(
        address _logic,
        address admin_,
        bytes memory _data
    ) payable TransparentUpgradeableProxy(_logic, admin_, _data) {
    }

}
