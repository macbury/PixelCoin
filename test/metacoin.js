var MetaCoin = artifacts.require("./MetaCoin.sol");
contract('MetaCoin', (accounts) => {
  let instance = null
  beforeEach(async () => {
    instance = await MetaCoin.deployed();
  })

  it("should put 10000000 PXC in the first account", async () => {
    let balance = await instance.balanceOf.call(accounts[0])
    assert.equal(balance.valueOf(), 10000000, "10000000 wasn't in the first account")
  })

  it("should have 0 PXC in the other account", async () => {
    let balance = await instance.balanceOf.call(accounts[1])
    assert.equal(balance.valueOf(), 0, "0 wasn't in the second account")
  })

  it("should allow buy tokens", async () => {
    let account = accounts[4]
    await instance.buyToken({ from: account, value: web3.toWei(1, 'ether') });
    let balance = await instance.balanceOf.call(account)
    assert.equal(balance.valueOf(), 5, "5 is in second account")
    assert.ok(web3.eth.getBalance(account).lessThan(web3.toWei(100, 'ether')));
  })

  it("should deny buing tokens", async () => {
    let emptyAccount = accounts[3]
    try {
      await instance.buyToken({ from: emptyAccount, value: web3.toWei(1000, 'ether') });
      assert.fail();
    } catch (err) {
      assert.ok(/sender doesn't have enough funds to send tx/.test(err.message))
      let balance = await instance.balanceOf.call(emptyAccount)
      assert.equal(balance.valueOf(), 0, "0 is in second account")
    }
  })
});
