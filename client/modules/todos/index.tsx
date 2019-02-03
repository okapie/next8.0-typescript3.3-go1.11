import { Dispatch } from "redux"
import { createAction, handleActions } from "redux-actions"
import { all, takeLatest } from "redux-saga/effects"
import TodosService from "../../services/todos";

/**
 * Default State.
 */
const defaultState = {
  list: [],
  postResult: false,
  deleteResult: false
}

/**
 * Action Creator.
 */
const GET_TODOS_LIST = "GET_TODOS_LIST"
const GET_TODOS_LIST_DONE = "GET_TODOS_LIST_DONE"
const POST_TODO = "POST_TODO"
const POST_TODO_DONE = "POST_TODO_DONE"
const DELETE_TODO = "DELETE_TODO"
const DELETE_TODO_DONE = "DELETE_TODO_DONE"
const actions = {
  getTodosList: createAction(GET_TODOS_LIST),
  getTodosListDone: createAction(GET_TODOS_LIST_DONE),
  postTodo: createAction(POST_TODO),
  postTodoDone: createAction(POST_TODO_DONE),
  deleteTodo: createAction(DELETE_TODO),
  deleteTodoDone: createAction(DELETE_TODO_DONE)
}

/**
 * Reducers.
 */
const reducers = handleActions(
  /**
   * reducerMap.
   */
  {
    [GET_TODOS_LIST_DONE]: (state: Object, { payload }) => ({ ...state, list: payload }),
    [POST_TODO_DONE]: (state: Object, { payload }) => ({ ...state, postResult: payload }),
    [DELETE_TODO_DONE]: (state: Object, { payload }) => ({ ...state, deleteResult: payload })
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
    takeLatest(actions.getTodosList as any, getTodosList),
    takeLatest(actions.postTodo as any, postTodo),
    takeLatest(actions.deleteTodo as any, deleteTodo),
  ])
}

export const getTodosList = () => {
  return async (dispatch: Dispatch) => {
    const response = await TodosService.getTodoList()
    if (response.length > 0) {
      dispatch(actions.getTodosListDone(response))
    }
  }
}

export const postTodo = (inputText: string) => {
  return async (dispatch: Dispatch) => {
    const response = await TodosService.postTodo(inputText)
    if (response.length > 0) {
      dispatch(actions.postTodoDone(true))
    }
  }
}

export const deleteTodo = (id: string) => {
  return async (dispatch: Dispatch) => {
    const response = await TodosService.deleteTodo(id)
    if (response.length > 0) {
      dispatch(actions.deleteTodoDone(true))
    }
  }
}

export default { reducers, actions, sagas }