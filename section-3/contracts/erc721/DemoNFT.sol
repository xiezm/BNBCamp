//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {ERC721EnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import {IERC2981Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {ERC2981Upgradeable} from "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import {EnumerableSetUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

import {AccessControlEnumerableUpgradeable} from "../access/AccessControlEnumerableUpgradeable.sol";

contract DomainNFT is AccessControlEnumerableUpgradeable, PausableUpgradeable, ERC721EnumerableUpgradeable, ERC2981Upgradeable {

    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    using Counters for Counters.Counter;

    Counters.Counter private _currentTokenId;

    // metadata URI
    string private _baseURI_;

    //tokenId => isFrozen
    mapping(uint256 => bool) public isFrozenTokenId;

    // keccak256("ROLE_ADMIN");
    bytes32 public constant ROLE_ADMIN = 0x2172861495e7b85edac73e3cd5fbb42dd675baadf627720e687bcfdaca025096;

    // keccak256("ROLE_FROZEN")
    bytes32 public constant ROLE_FROZEN = 0x3a3715976b06c2a5190eeb06fb06e4501099b4c3606ba09c0f2bc6dc166ef1d7;

    event FrozenTokenId(uint256 tokenId);

    event UnfreezeTokenId(uint256 tokenId);

    function initialize() public initializer {
        __AccessControlEnumerable_init();
        __Pausable_init();
        __ERC2981_init();
        __ERC721_init("DemoNFT", "DemoNFT");
        //
        _setRoleAdmin(ROLE_ADMIN, ROLE_ADMIN);
        _setRoleAdmin(ROLE_FROZEN, ROLE_ADMIN);
        //
        _grantRole(ROLE_ADMIN, _msgSender());
        _grantRole(ROLE_FROZEN, _msgSender());
        //
        _setDefaultRoyalty(_msgSender(), 50);
    }

    function supportsInterface(bytes4 interfaceId) public view override(AccessControlEnumerableUpgradeable, ERC721EnumerableUpgradeable, ERC2981Upgradeable) returns (bool) {
        return interfaceId == type(IERC2981Upgradeable).interfaceId || super.supportsInterface(interfaceId);
    }

    function owner() public view returns (address) {
        return getRoleMember(ROLE_ADMIN, 0);
    }

    function pause() external {
        require(hasRole(ROLE_ADMIN, _msgSender()), "DomainNFT: ERR_ACCESS_DENIED");
        _pause();
    }

    function unpause() external {
        require(hasRole(ROLE_ADMIN, _msgSender()), "DomainNFT: ERR_ACCESS_DENIED");
        _unpause();
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURI_;
    }

    function setBaseURI(string calldata baseURI) external {
        require(hasRole(ROLE_ADMIN, _msgSender()), "DomainNFT: ERR_ACCESS_DENIED");
        _baseURI_ = baseURI;
    }

    function mint(address recipient) public {
        _currentTokenId.increment();
        uint256 currentTokenId = _currentTokenId.current();
        _safeMint(recipient, currentTokenId);
    }

    function burn(uint256 tokenId) external {
        require(!isFrozenTokenId[tokenId], 'DomainNFT: is frozen tokenId');
        super._burn(tokenId);
    }

    function batchMint(address[] memory recipients) external {
        require(recipients.length > 0, 'DomainNFT: recipients is empty');
        uint256 length = recipients.length;
        for (uint256 i = 0; i < length;) {
            mint(recipients[i]);
            unchecked{++i;}
        }
    }

    function getTokenIdsByCurator(address curator) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(curator);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(curator, i);
        }
        return tokenIds;
    }

    function viewRoleMember(bytes32 role, uint256 cursor, uint256 size) external view returns (address[] memory, uint256){
        uint256 length = size;
        if (length > _roleMembers[role].length() - cursor) {
            length = _roleMembers[role].length() - cursor;
        }
        address[] memory roleMember = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            roleMember[i] = _roleMembers[role].at(cursor + i);
        }
        return (roleMember, cursor + length);
    }

    function _revokeRole(bytes32 role, address account) internal override {
        super._revokeRole(role, account);
        if (role == ROLE_ADMIN) {
            require(getRoleMemberCount(ROLE_ADMIN) > 0, 'DomainNFT: there must be an administrator');
        }
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId) internal {
        require(!isFrozenTokenId[tokenId], 'DomainNFT: is frozen tokenId');
        super._transfer(from, to, tokenId);
    }

}
