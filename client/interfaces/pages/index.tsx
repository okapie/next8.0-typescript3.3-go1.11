import { DefaultQuery, RouterProps } from "next-server/router";
import { NextComponentType, NextContext, NextStaticLifecycle } from "next";
import { Dispatch, Store } from "redux";
import { Task } from "redux-saga";

export interface AppProps<Q extends DefaultQuery = DefaultQuery> {
  Component: NextComponentType<any, any, NextContext<Q>>;
  router: RouterProps<Q>;
  store: Store<any[]>;
}

export interface CtxType {
  ctx: {
    store: SagaType & Store<any>;
    isServer: boolean;
  };
}

export interface ContextType {
  Component: NextStaticLifecycle<{}, any>;
  ctx: Object;
}

export interface SagaType {
  dispatch: Dispatch;
  runSagaTask?: () => void;
  sagaTask?: Task;
}

interface ItemType {
  id: number;
  item: string;
}

interface TodoType {
  isFetching: boolean;
  data: Array<ItemType>;
}

export interface OtherProps {
  todos: {
    lists: TodoType;
  };
}
