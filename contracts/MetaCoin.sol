pragma solidity ^0.4.17;

import 'openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol';

contract MetaCoin is BasicToken {
  string public constant name = "PixelCoin";
  string public constant symbol = "PIC";
  uint8 public constant decimals = 2;
  uint256 public constant INITIAL_SUPPLY = 100000 * (10 ** uint256(decimals));
  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  constructor() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
  }
}
