import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'reducers'
import LoadEthereum from 'containers/loading_ethereum'
import Balance from 'components/balance'
import BuyTokens from 'components/buy_tokens'
import RequireMetaMask from 'containers/require_metamask'

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <RequireMetaMask>
          Hello!
          <BuyTokens />
          <Balance />
        </RequireMetaMask>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')
  ReactDOM.render(
    <Provider store={store}>
      <LoadEthereum>
        <HelloMessage />
      </LoadEthereum>
    </Provider>, root)
})
