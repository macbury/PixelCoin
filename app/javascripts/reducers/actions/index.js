import createActions from 'redux-actions-generator'

export default createActions('', [
  'ETHEREUM_INIT',
  'ETHEREUM_READY',
  'ETHEREUM_ERROR',
  'ETHEREUM_MISSING_METAMASK',
  'ETHEREUM_ACCOUNT_CHANGE',
  'ETHEREUM_UPDATE_BALANCE'
])
