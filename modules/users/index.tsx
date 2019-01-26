import { createAction, handleActions } from "redux-actions"
import { all, put, takeLatest } from "redux-saga/effects"

const defaultState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
}

/**
 * Action Creator.
 */
const FAILURE = "FAILURE"
const LOAD_DATA = "LOAD_DATA"
const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS"
const actions = {
  failure: createAction(FAILURE),
  loadData: createAction(LOAD_DATA),
  loadDataSuccess: createAction(LOAD_DATA_SUCCESS)
};

/**
 * Reducers.
 */
const reducers = handleActions(
  /**
   * reducerMap.
   */
  {
    [FAILURE]: (state: Object, { payload }) => ({ ...state, list: payload }),
    [LOAD_DATA_SUCCESS]: (state: Object, { payload }) => ({ ...state, deleteResult: payload })
  },
  /**
   * defaultState.
   */
  defaultState
);

/**
 * Sagas.
 */
const sagas = function* () {
  yield all([
    takeLatest(actions.loadData, loadData),
  ])
}

function* loadData() {
  try {
    const res = yield fetch("https://jsonplaceholder.typicode.com/users")
    const data = yield res.json()
    yield put(actions.loadDataSuccess(data))
  } catch (err) {
    yield put(actions.failure(err))
  }
}

export default { reducers, actions, sagas }
