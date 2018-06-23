import Actions from './actions'

export function pixels(state = [], action) {
  let { type, payload } = action
  switch (type) {
    case Actions.PIXELS_UPDATED:
      return payload.slice()
    break
  }
  return state
}
