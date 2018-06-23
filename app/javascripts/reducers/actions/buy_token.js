import Actions from 'actions'
import MetaCoin from 'metacoin'
import { push } from 'connected-react-router'
import { updateBalance } from './ethereum'
import { showError } from './modal'

export function setCoins(coins) {
  coins = parseInt(coins) || 0
  return async (dispatch) => {
    let instance = await MetaCoin.deployed()
    let wei = await(instance.coinsToWei.call(coins))
    wei = wei.toString()
    dispatch({ type: Actions.BUY_TOKEN_SET_COINS, payload: { coins, wei } })
  }
}

export function buyToken(account, weiAmount) {
  return async (dispatch) => {
    dispatch({ type: Actions.BUY_TOKEN_LOADING, payload: true })
    let instance = await MetaCoin.deployed()
    try {
      let { tx } = await instance.buyToken({ from: account, value: weiAmount })
      dispatch(updateBalance(account))
      dispatch(setCoins(1))
      dispatch(push(`/buy/confirmation/${tx}`))
    } catch (e) {
      console.error(e)
      dispatch(showError(e.toString()))
    }
    dispatch({ type: Actions.BUY_TOKEN_LOADING, payload: false })
  }
}
