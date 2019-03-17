import { createAction, handleActions } from "redux-actions";
import { all, takeLatest, put, call } from "redux-saga/effects";
import TodosService from "../../services/todos";

/**
 * Default State.
 */
const defaultState = {
  list: {
    isFetching: false,
    data: null
  },
  postResult: false,
  deleteResult: false
};

/**
 * Action Creator.
 */
const GET_TODOS_LIST = "GET_TODOS_LIST";
const GET_TODOS_LIST_DONE = "GET_TODOS_LIST_DONE";
const POST_TODO = "POST_TODO";
const POST_TODO_DONE = "POST_TODO_DONE";
const DELETE_TODO = "DELETE_TODO";
const DELETE_TODO_DONE = "DELETE_TODO_DONE";
const actions = {
  getTodosList: createAction(GET_TODOS_LIST),
  getTodosListDone: createAction(GET_TODOS_LIST_DONE),
  postTodo: createAction(POST_TODO),
  postTodoDone: createAction(POST_TODO_DONE),
  deleteTodo: createAction(DELETE_TODO),
  deleteTodoDone: createAction(DELETE_TODO_DONE)
};

/**
 * Reducers.
 */
const reducers = handleActions(
  /**
   * reducerMap.
   */
  {
    [GET_TODOS_LIST as string]: () => ({
      list: {
        isFetching: true
      }
    }),
    [GET_TODOS_LIST_DONE as string]: (state: Object, { payload }) => ({
      ...state,
      list: {
        isFetching: false,
        data: payload
      }
    }),
    [POST_TODO_DONE as string]: (state: Object, { payload }) => ({
      ...state,
      postResult: payload
    }),
    [DELETE_TODO_DONE as string]: (state: Object, { payload }) => ({
      ...state,
      deleteResult: payload
    })
  },
  /**
   * defaultState.
   */
  defaultState
);

/**
 * Sagas.
 */
const sagas = function*() {
  yield all([
    takeLatest(actions.getTodosList as any, getTodosList),
    takeLatest(actions.postTodo as any, postTodo),
    takeLatest(actions.deleteTodo as any, deleteTodo)
  ]);
};

export function* getTodosList() {
  try {
    const response = yield call(TodosService.getTodoList);
    if (response) {
      yield put(actions.getTodosListDone(response));
    }
  } catch (err) {
    // TODO: Error handling.
  }
}

export function* postTodo(parameters: { payload: string, type: string }) {
  try {
    const postResult = yield call(TodosService.postTodo, parameters.payload);
    if (postResult.result) {
      yield put(actions.postTodoDone(postResult));
      const getResult = yield call(TodosService.getTodoList);
      if (getResult) {
        yield put(actions.getTodosListDone(getResult));
      }
    }
  } catch (err) {
    // TODO: Error handling.
  }
}

export function* deleteTodo(parameters: { payload: number, type: string }) {
  try {
    const deleteResult = yield call(TodosService.deleteTodo, parameters.payload);
    if (deleteResult.result) {
      yield put(actions.deleteTodoDone(deleteResult));
      const getResult = yield call(TodosService.getTodoList);
      if (getResult) {
        yield put(actions.getTodosListDone(getResult));
      }
    }
  } catch (err) {
    // TODO: Error handling.
  }
}

export default { reducers, actions, sagas };
