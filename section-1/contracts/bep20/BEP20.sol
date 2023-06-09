// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BEP20 is ERC20, Ownable {

    uint8 private _decimals;

    constructor(string memory name_, string memory symbol_, uint8 decimals_) ERC20(name_, symbol_) {
        _decimals = decimals_;
        claim(_msgSender());
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function claim(address to) public {
        _mint(to, 100_000_000 * (10 ** decimals()));
    }

}
