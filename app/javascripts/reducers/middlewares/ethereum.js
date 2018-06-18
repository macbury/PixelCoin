import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'
const MetaCoin = contract(require('contracts/MetaCoin.json?load-inline'))

export const ethereumMiddleware = function ethereumMiddleware(store) {
  let instance = null

  window.addEventListener('load', async () => {
    if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(web3.currentProvider)
    } else {
      // emit event, install metamask
    }
    MetaCoin.setProvider(web3.currentProvider)
    try {
      instance = await MetaCoin.deployed()
    } catch (e) {
      console.error(e)
    }
  })

  return function (next) {
    return function (action) {
      next(action)
    }
  }
}
