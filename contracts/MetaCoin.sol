pragma solidity ^0.4.17;

import 'openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol';

contract MetaCoin is BasicToken {
  event PixelChange(uint256 pixelId);

  address owner;
  string public constant name = "PixelCoin";
  string public constant symbol = "PXC";
  uint8 public constant decimals = 0;
  uint256 public constant INITIAL_SUPPLY = 100000 * (10 ** uint256(decimals));
  uint16 public constant NUMBER_OF_PIXELS = 315;
  uint public constant CONVERSION_RATE = 50000;
  uint public constant CURRENCY_MULTIPLIER = 10 ** 18;
  uint16 public constant NUMBER_OF_ELEMENTS = NUMBER_OF_PIXELS * 3;
  uint8 public constant COIN_PER_MINUTE = 1;
  struct Pixel {
    uint8 red;
    uint8 green;
    uint8 blue;
    address owner;
    uint256 expireAt;
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

  function minutesToCoins(uint numofMinutes) public pure returns(uint) {
    return numofMinutes * COIN_PER_MINUTE;
  }

  function isColor(uint color) private pure returns(bool) {
    return color >= 0 && color <= 255;
  }

  /**
  * @dev Check if pixel is expired and ready to sell
  * @param id of the pixel
  */
  function isExpired(uint id) public view returns(bool) {
    return now > pixels[id].expireAt;
  }

  /**
   * @dev Buy pixel in matrix.
   * @param id Id of the pixel.
   * @param red Red color component.
   * @param red Green color component.
   * @param red Blue color component.
   * @param numofMinutes Number of minutes that pixel should be shown.
  */
  function buyPixel(uint id, uint8 red, uint8 green, uint8 blue, uint numofMinutes) public returns(bool) {
    require(id >= 0 && id < NUMBER_OF_PIXELS);
    require(numofMinutes > 0);
    require(isColor(red) && isColor(green) && isColor(blue));
    require(isExpired(id));

    uint coins = minutesToCoins(numofMinutes);
    require(balances[msg.sender] >= coins);

    balances[msg.sender] = balances[msg.sender].sub(coins);
    emit Transfer(msg.sender, owner, coins);

    Pixel storage pixel = pixels[id];
    pixel.red = red;
    pixel.green = green;
    pixel.blue = blue;
    pixel.owner = msg.sender;
    pixel.expireAt = now + (numofMinutes * 60 seconds);

    emit PixelChange(id);
    return true;
  }

  function buyToken() public payable {
    uint coins = this.weiToCoins(msg.value);
    require(coins > 0);
    balances[msg.sender] = balances[msg.sender].add(coins);
    totalSupply_.add(coins);
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
      uint pixelId = i / 3;
      if (isExpired(pixelId)) {
        output[i] = 0;
        output[i+1] = 0;
        output[i+2] = 0;
      } else {
        Pixel memory pixel = pixels[i/3];
        output[i] = pixel.red;
        output[i+1] = pixel.green;
        output[i+2] = pixel.blue;
      }
    }
  }
}
