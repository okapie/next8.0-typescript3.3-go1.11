import { applyMiddleware, createStore, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import modules from "./rootReducer"

/**
 * Store.
 */
export default () => {
  const saga = createSagaMiddleware()
  const middleware = [saga]
  const enhancers = compose(applyMiddleware(...middleware))
  const store = createStore(modules.reducer, enhancers)
  saga.run(modules.saga)

  return store
}
