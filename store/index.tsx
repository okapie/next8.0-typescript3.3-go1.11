import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import modules from '../modules'

const bindMiddleware = middleware => {
  return compose(applyMiddleware(...middleware))
}

export default () => {
  const saga = createSagaMiddleware()
  const store = createStore(
    modules.reducer,
    bindMiddleware([saga])
  )

  store.runSagaTask = () => {
    store.sagaTask = saga.run(modules.saga)
  }

  store.runSagaTask()

  return store
}
