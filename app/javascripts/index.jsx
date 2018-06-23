import 'semantic-ui-css/semantic.min.css'
import '../stylesheets/app.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store, history } from 'reducers'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'

import BuyTokensPage from 'pages/buy/tokens'
import HomePage from 'pages/home'
import BuyPixelPage from 'pages/buy/pixel'
import ConfirmationPage from 'pages/buy/confirmation'
import LoadEthereum from 'containers/loading_ethereum'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LoadEthereum>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/buy/tokens" component={BuyTokensPage} />
          <Route exact path="/buy/confirmation/:tx" component={ConfirmationPage} />
          <Route exact path="/buy/pixel/:id" component={BuyPixelPage} />
        </LoadEthereum>
      </ConnectedRouter>
    </Provider>, root)
})
