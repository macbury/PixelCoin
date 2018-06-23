import Actions from './actions'

export function modal(state = { message: null }, action) {
  let { type, payload } = action
  switch (type) {
    case Actions.APP_ERROR:
      return { ...state, message: payload }
    break
    case Actions.CLOSE_MODAL:
      return { ...state, message: null }
    break
  }
  return state
}
