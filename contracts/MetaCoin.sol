pragma solidity ^0.4.17;

import 'openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol';

contract MetaCoin is BasicToken {
  address owner;
  string public constant name = "PixelCoin";
  string public constant symbol = "PXC";
  uint8 public constant decimals = 0;
  uint256 public constant INITIAL_SUPPLY = 100000 * (10 ** uint256(decimals));
  uint16 public constant NUMBER_OF_PIXELS = 315;
  uint public constant CONVERSION_RATE = 50000;
  uint public constant CURRENCY_MULTIPLIER = 10 ** 18;
  uint16 public constant NUMBER_OF_ELEMENTS = NUMBER_OF_PIXELS * 3;
  struct Pixel {
    uint8 red;
    uint8 green;
    uint8 blue;
    address owner;
    uint expireAt;
  }

  Pixel[NUMBER_OF_PIXELS] pixels;
  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  constructor() public {
    owner = msg.sender;
    totalSupply_ = INITIAL_SUPPLY;
    balances[owner] = INITIAL_SUPPLY;
    emit Transfer(0, owner, INITIAL_SUPPLY);
  }

  function weiToCoins(uint valueWei) public pure returns(uint) {
    return valueWei * CONVERSION_RATE / CURRENCY_MULTIPLIER;
  }

  function coinsToWei(uint coins) public pure returns(uint) {
    return coins * CURRENCY_MULTIPLIER / CONVERSION_RATE;
  }

  function buyToken() public payable {
    uint coins = this.weiToCoins(msg.value);
    require(coins > 0);
    balances[msg.sender] += coins;
    totalSupply_ += coins;
    emit Transfer(owner, msg.sender, coins);
  }

  function getColor(uint index) public view returns(uint8 red, uint8 green, uint8 blue) {
    Pixel memory pixel = pixels[index];
    red = pixel.red;
    green = pixel.green;
    blue = pixel.blue;
  }

  function getPixels() public view returns(uint8[NUMBER_OF_ELEMENTS] output) {
    for (uint i = 0; i < NUMBER_OF_ELEMENTS; i += 3) {
      Pixel memory pixel = pixels[i/3];
      output[i] = pixel.red;
      output[i+1] = pixel.green;
      output[i+2] = pixel.blue;
    }
  }
}
