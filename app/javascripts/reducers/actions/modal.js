import Actions from 'actions'

export function showError (message) {
  return { type: Actions.APP_ERROR, payload: message }
}

export function hideError () {
  return { type: Actions.CLOSE_MODAL }
}
