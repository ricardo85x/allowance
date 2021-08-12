// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeUSDCToken is ERC20 {
    constructor() ERC20("Fake USDC Token","USDC") {

    }
    // send free to all!
    function GiveMeSome(uint _ammount) public {
        _mint(msg.sender, _ammount);
    }

    function approveAll(address _address) public {
        approve(_address, 2**18);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}