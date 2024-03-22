// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Keymanager {
    struct Key {
        uint id;
        string ipfsHash;
    }
    mapping(address => Key[]) keys;
    mapping(address => mapping(string => bool)) isIpfsHashExists;
    modifier doesHashExist(string calldata _ipfsHash) {
        require(
            bytes(_ipfsHash).length == 46,
            "KeyManager: Actual IPFS hash is required!"
        );
        require(
            !isIpfsHashExists[msg.sender][_ipfsHash],
            "KeyManager: IPFS hash already exists!"
        );
        _;
    }
    function addKey(string calldata _ipfsHash) public doesHashExist(_ipfsHash) {
        keys[msg.sender].push(Key(keys[msg.sender].length, _ipfsHash));
        isIpfsHashExists[msg.sender][_ipfsHash] = true;
    }
    function getMyKeys() public view returns (Key[] memory) {
        return keys[msg.sender];
    }
}
