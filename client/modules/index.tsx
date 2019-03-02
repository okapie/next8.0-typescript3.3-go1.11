import { Reducer, combineReducers } from "redux"
import { fork, all } from "redux-saga/effects"
import modules from "./todos"
import { CombinedState } from "../interfaces/modules";

type CombineReducerMap<S extends {}> = { [K in keyof S]: Reducer<S[K]> }

/**
 * Set multi reducers.
 */
const reducerMap: CombineReducerMap<CombinedState> = {
  // sample: someReducers,
  todos: modules.reducers
}

/**
 * Root Reducer.
 */
export default {
  action: {
    ...modules.actions,
  },
  reducer: combineReducers<CombinedState>(reducerMap),
  saga: function* saga() {
    yield all([
      fork(modules.sagas)
    ])
  }
}
