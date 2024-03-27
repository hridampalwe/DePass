// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Keymanager {
    struct Key {
        uint id;
        string credentialType;
        string ipfsHash;
        bool isDeleted;
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
    modifier onlyExistingKey(uint _id) {
        require(
            _id < keys[msg.sender].length,
            "KeyManager: Key does not exist!"
        );
        _;
    }
    function addKey(
        string calldata _ipfsHash,
        string calldata _credentialType
    ) public doesHashExist(_ipfsHash) {
        keys[msg.sender].push(
            Key(keys[msg.sender].length, _credentialType, _ipfsHash, false)
        );
        isIpfsHashExists[msg.sender][_ipfsHash] = true;
    }
    function updateKey(
        uint _id,
        string calldata _ipfsHash
    ) public doesHashExist(_ipfsHash) onlyExistingKey(_id) {
        keys[msg.sender][_id].ipfsHash = _ipfsHash;
        isIpfsHashExists[msg.sender][_ipfsHash] = true;
    }
    function deleteKey(uint _id) public onlyExistingKey(_id) {
        keys[msg.sender][_id].isDeleted = true;
    }
    function getMyKeys() public view returns (Key[] memory) {
        return keys[msg.sender];
    }
}
