import { default as Web3 } from 'web3'
import Actions from 'actions'
import MetaCoin from 'metacoin'
import { updateBalance, changeAccount } from 'actions/ethereum'

class Middleware {
  metaCoin = null

  async loadEthereum() {
    if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(web3.currentProvider)
    } else {
      console.error("// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)")
      this.store.dispatch({ type: Actions.ETHEREUM_MISSING_METAMASK })
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7000"))
    }
    MetaCoin.setProvider(web3.currentProvider)
    try {
      this.metaCoin = await MetaCoin.deployed()
      this.store.dispatch({ type: Actions.ETHEREUM_READY })
    } catch (e) {
      this.store.dispatch({ type: Actions.ETHEREUM_ERROR, payload: e.toString() })
      console.error(e)
    }
    this.watchAccounts()
    this.watchTransferEvents()
  }

  async watchAccounts() {
    let account = web3.eth.accounts[0]
    this.store.dispatch(changeAccount(account))
    let accountInterval = setInterval(() => {
      if (web3.eth.accounts[0] !== account) {
        account = web3.eth.accounts[0]
        this.store.dispatch(changeAccount(account))
      }
    }, 100)
  }

  async watchTransferEvents() {
    let instance = await MetaCoin.deployed()
    instance.Transfer().watch(() => {
      console.log("TRANSFER is global")
      this.store.dispatch(updateBalance(web3.eth.accounts[0]))
    })
  }

  handle = (store) => {
    this.store = store
    return (next) => (action) => {
      switch(action.type) {
        case (Actions.ETHEREUM_INIT):
          this.loadEthereum()
        break
      }

      next(action)
    }
  }
}

const middleware = new Middleware()
export const ethereumMiddleware = middleware.handle

export function ethereumReducer(state = { loading: true, metamask: true, error: null }, action) {
  let { type, payload } = action
  switch (type) {
    case Actions.ETHEREUM_MISSING_METAMASK:
      return {...state, metamask: false }
    break
    case Actions.ETHEREUM_ERROR:
      return {...state, error: payload }
    break

    case Actions.ETHEREUM_READY:
      return {...state, loading: false, error: null, metamask: true }
    break

    case Actions.ETHEREUM_ACCOUNT_CHANGE:
      return {...state, account: payload }
    break

    case Actions.ETHEREUM_UPDATE_BALANCE:
      return {...state, balance: payload }
    break
  }
  return {...state}
}
