import Actions from './actions'

const INITIAL_STATE = { id: null, color: { r: 0, g: 0, b: 0 }, minutes: 1, loading: false }

export function buyPixel(state = INITIAL_STATE, action) {
  let { type, payload } = action
  switch (type) {
    case Actions.SELECT_PIXEL:
      return { ...state, id: payload }

    case Actions.SET_PIXEL_COLOR:
      return { ...state, color: payload }

    case Actions.SET_LEASE_TIME:
      let { coins, minutes } = payload
      return { ...state, minutes, coins }

    case Actions.BUY_PIXEL_LOADING:
      return { ...state, loading: payload }

    case Actions.CLEAR_PIXEL:
      return { ...INITIAL_STATE }
  }
  return { ...state }
}
