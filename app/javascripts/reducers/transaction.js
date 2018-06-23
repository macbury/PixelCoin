import Actions from './actions'

export function transaction(state = { tx: null, block: null }, action) {
  let { type, payload } = action
  switch (type) {
    case Actions.SET_TRANSACTION_STATUS:
      let { tx, block } = payload
      return { ...state, tx, block }
    break
  }
  return state
}
