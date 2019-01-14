import { all } from "redux-saga/effects" // TODO: Import fork.
import { combineReducers } from "redux"

/**
 * Root Reducer.
 */
export default {
  action: {
    // TODO: Add actions.
  },
  reducer: combineReducers({
    // TODO: Add reducers.
  }),
  saga: function* saga() {
    yield all([
      // TODO: Need to fork effects.
    ])
  }
}
