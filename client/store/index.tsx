import {
  applyMiddleware,
  createStore,
  compose,
  Store
} from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import modules from "../modules";
import { SagaType, ExtendedMiddleware } from "../interfaces/store";

const bindMiddleware = (
  middleware: ExtendedMiddleware | SagaMiddleware<{}>[]
) => compose(applyMiddleware(...middleware));

export default () => {
  const saga: SagaMiddleware<{}> = createSagaMiddleware();

  /**
   * Since Next.js does server-side rendering, you are REQUIRED to pass `preloadedState`
   * when creating the store.
   */
  const store: SagaType & Store<any> = createStore(
    modules.reducer,
    bindMiddleware([saga])
  );

  /**
   * next-redux-saga depends on `runSagaTask` and `sagaTask` being attached to the store.
   *
   *   `runSagaTask` is used to rerun the rootSaga on the client when in sync mode (default)
   *   `sagaTask` is used to await the rootSaga task before sending results to the client
   *
   */
  store.runSagaTask = () => (store.sagaTask = saga.run(modules.saga));

  /**
   * Run the rootSaga initially.
   */
  store.runSagaTask();

  return store;
};
