import Actions from 'actions'
import MetaCoin from 'metacoin'
import { showError } from './modal'

export function initEthereum () {
  return { type: Actions.ETHEREUM_INIT }
}

export function checkConfirmation(tx) {
  return async (dispatch) => {
    web3.eth.getTransaction(tx, (err, block) => {
      dispatch({ type: Actions.SET_TRANSACTION_STATUS, payload: { tx, block } })
    })
  }
}

export function updatePixels () {
  return async (dispatch) => {
    let instance = await MetaCoin.deployed()
    let rawPixels = await instance.getPixels()
    let pixels = []
    while (rawPixels.length > 0) {
      let r = parseInt(rawPixels.shift().toFixed())
      let g = parseInt(rawPixels.shift().toFixed())
      let b = parseInt(rawPixels.shift().toFixed())
      pixels.push({ r, g, b })
    }
    dispatch({ type: Actions.PIXELS_UPDATED, payload: pixels })
  }
}

export function updateBalance (account) {
  return async (dispatch) => {
    let instance = await MetaCoin.deployed()
    let value = await instance.balanceOf.call(account, { from: account })
    dispatch({ type: Actions.ETHEREUM_UPDATE_BALANCE, payload: value.toString() })
  }
}

export function changeAccount (account) {
  return (dispatch) => {
    dispatch({ type: Actions.ETHEREUM_ACCOUNT_CHANGE, payload: account })
    dispatch(updateBalance(account))
  }
}

export function buyTokens ({ amount, account }) {
  return async (dispatch) => {
    let instance = await MetaCoin.deployed()
    try {
      await instance.buyToken({ from: account, value: amount })
      dispatch(updateBalance(account))
    } catch (error) {
      console.log(error)
      showError(error.toString())
    }
  }
}
