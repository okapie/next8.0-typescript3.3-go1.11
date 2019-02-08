import { combineReducers } from "redux"
import { fork, all } from "redux-saga/effects"
import modules from "./todos"

/**
 * Root Reducer.
 */
export default {
  action: {
    ...modules.actions,
  },
  reducer: combineReducers({
    todos: modules.reducers
  }),
  saga: function* saga() {
    yield all([
      fork(modules.sagas)
    ])
  }
}
