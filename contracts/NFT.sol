// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.21;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, ERC721Burnable, ERC721URIStorage, ERC721Enumerable, Ownable{

    constructor(
        string memory _name,
        string memory _symbol, 
        address _owner
        ) 
        ERC721(_name, _symbol)
        Ownable(_owner){
    }

    function _mintNFT(
        address _to, 
        string memory _tokenURI
        )external onlyOwner{
            
            uint256 tokenId = totalSupply();
            _safeMint(_to, tokenId);
            _setTokenURI(tokenId, _tokenURI);

        }

        function transfer(address reciever, uint256 amount)
        public
        virtual 
        {

            _transfer(msg.sender, reciever, amount);

        }
        
         //The following functions are overrides

        function tokenURI(
            uint256 tokenId
        )
        public 
        view 
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
        {

            return super.tokenURI(tokenId);
        }

        function supportsInterface(bytes4 interfaceId)
        public 
        view
        override(ERC721, ERC721URIStorage, ERC721Enumerable)
        returns(bool)
        {

            return super.supportsInterface(interfaceId);

        }

        function _update(address to, uint256 tokenId, address auth)
        internal
        virtual
        override(ERC721, ERC721Enumerable)
        returns(address){

            return super._update(to, tokenId, auth);
        }

         function _increaseBalance(address account, uint128 value) 
         internal 
         virtual 
         override(ERC721, ERC721Enumerable){ 
            super._increaseBalance(account, value);
         }

}
