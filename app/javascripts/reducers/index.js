import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { ethereumMiddleware, ethereumReducer as ethereum } from './middlewares/ethereum'
import { buyToken } from './buy_tokens'
import { pixels } from './pixels'
import { modal } from './modal'
import { buyPixel } from './buy_pixel'
import { transaction } from './transaction'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createHashHistory'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const history = createHistory()
const reducers = combineReducers({
  ethereum,
  buyToken,
  buyPixel,
  pixels,
  modal,
  transaction
})

const middlewares = applyMiddleware(
  routerMiddleware(history),
  ethereumMiddleware,
  thunkMiddleware
)

const store = createStore(connectRouter(history)(reducers), composeEnhancers(middlewares))

export { store, history }
