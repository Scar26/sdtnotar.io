pragma solidity ^0.5.0;

contract Notar{

  struct Ring{
    uint32 id;
    string _hash;
    uint256 nonce;
  }

  mapping(uint => Ring) private rings;
  uint32 public ringcount;
  address private _owner;
  uint256 public debugval;

  modifier onlyOwner {
    require(msg.sender == _owner);
    _;
  }


  constructor() public{
    _owner = msg.sender;
  }

  function addRing(string memory sig,uint256 amt) onlyOwner private{
    rings[ringcount] = Ring(ringcount, sig);
    ringcount++;
  }

  function getbal(address ad) public returns(uint256){
    debugval = address(ad).balance;
    return address(ad).balance;
  }

  function withdraw() public {
      msg.sender.transfer(address(this).balance);
    }

  function deposit(uint256 amount) payable public {
        require(msg.value == amount);
    }
}
