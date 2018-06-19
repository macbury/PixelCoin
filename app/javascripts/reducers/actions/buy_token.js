import Actions from 'actions'
import MetaCoin from 'metacoin'
import { updateBalance } from './ethereum'

export function setCoins(coins) {
  coins = parseInt(coins) || 0
  return async (dispatch) => {
    let instance = await MetaCoin.deployed()
    let wei = await(instance.coinsToWei(coins))
    wei = wei.toString()
    dispatch({ type: Actions.BUY_TOKEN_SET_COINS, payload: { coins, wei } })
  }
}

export function buyToken(account, weiAmount) {
  return async (dispatch) => {
    dispatch({ type: Actions.BUY_TOKEN_LOADING, payload: true })
    let instance = await MetaCoin.deployed()
    try {
      await instance.buyToken({ from: account, value: weiAmount })
      dispatch(updateBalance(account))
      dispatch(setCoins(0))
    } catch (e) {
      console.error(e)
    }
    dispatch({ type: Actions.BUY_TOKEN_LOADING, payload: false })
  }
}
