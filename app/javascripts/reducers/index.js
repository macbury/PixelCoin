import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { ethereumMiddleware, ethereumReducer as ethereum } from './middlewares/ethereum'
import { buyToken } from './buy_tokens'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  ethereum,
  buyToken
})

const middlewares = applyMiddleware(
  ethereumMiddleware,
  thunkMiddleware
)

const store = createStore(reducers, composeEnhancers(middlewares))

export { store }
