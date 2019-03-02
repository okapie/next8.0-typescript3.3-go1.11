import { Dispatch, MiddlewareAPI } from "redux";
import { SagaMiddleware, Task } from "redux-saga";

interface StateType extends Dispatch {
  type: string;
  payload: string | number | Array<any> | Object;
  middleware: Array<SagaMiddleware<{}>[]>;
}

export interface SagaType {
  dispatch: Dispatch;
  runSagaTask?: () => void;
  sagaTask?: Task;
}

export interface ExtendedMiddleware {
  <S extends StateType>(api: MiddlewareAPI<S>): (
    next: Dispatch<S>
  ) => Dispatch<S>;
  [Symbol.iterator](): IterableIterator<any>;
}
