import Actions from './actions'

export function buyToken(state = { coins: 0, wei: 0 }, action) {
  let { type, payload } = action
  switch (type) {
    case Actions.BUY_TOKEN_SET_COINS:
      let { coins, wei } = payload
      return {...state, coins, wei}
    break

    case Actions.BUY_TOKEN_LOADING:
      return { ...state, loading: payload }
    break
  }
  return {...state}
}
