pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QToken is ERC20 {
    constructor() ERC20("QToken","QTK") public {
        _mint(msg.sender, 10000 * (10 ** decimals()));
    }
}