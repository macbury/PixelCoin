import Actions from 'actions'
import MetaCoin from 'metacoin'

export function initEthereum() {
  return { type: Actions.ETHEREUM_INIT }
}

export function updateBalance(account) {
  return async (dispatch) => {
    let instance = await MetaCoin.deployed()
    let value = await instance.balanceOf.call(account, { from: account })
    dispatch({ type: Actions.ETHEREUM_UPDATE_BALANCE, payload: value.toString() })
  }
}

export function changeAccount(account) {
  return (dispatch) => {
    dispatch({ type: Actions.ETHEREUM_ACCOUNT_CHANGE, payload: account })
    dispatch(updateBalance(account))
  }
}

export function buyTokens({ amount, account }) {
  return async (dispatch) => {
    let instance = await MetaCoin.deployed()
    try {
      await instance.buyToken({ from: account, value: amount })
      dispatch(updateBalance(account))
    } catch (error) {
      console.log(error)
    }
  }
}
