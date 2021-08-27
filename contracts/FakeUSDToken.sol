// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeUSDToken is ERC20 {
    constructor() ERC20("Fake USD Token","FUSD") {

    }
    // send free to all!
    function GiveMeSome(uint _amount) public {
        _mint(msg.sender, _amount);
    }

    event giveToEvent(address indexed _from, address indexed _to, uint indexed _amount);
    function giveTo(address _address, uint _amount) public {
        _mint(_address, _amount);
        emit giveToEvent(msg.sender, _address, _amount);
    }

    event approveEvent(address indexed _address);


    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        super.approve(spender, amount);
        emit approveEvent(msg.sender);
        return true;
    }
    

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}