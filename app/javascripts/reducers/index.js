import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { ethereumMiddleware } from './middlewares/ethereum'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  test: () => { return [] }
})

const middlewares = applyMiddleware(
  ethereumMiddleware,
  thunkMiddleware
)

const store = createStore(reducers, composeEnhancers(middlewares))

export { store }
