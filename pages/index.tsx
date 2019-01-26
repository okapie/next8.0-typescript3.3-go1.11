import React from "react"
import { connect } from "react-redux"
import modules from "../modules"
import Page from "../components/page"
import { Dispatch, Store } from "redux"
import { Task } from "redux-saga"

interface ContextType {
  ctx: {
    store: SagaType & Store<any>;
    isServer: boolean;
  }
}

interface SagaType {
  dispatch: Dispatch;
  runSagaTask?: () => void;
  sagaTask?: Task;
}

class Index extends React.Component {
  static async getInitialProps (props: ContextType) {
    const { store, isServer } = props.ctx

    if (!store.getState().placeholderData) {
      store.dispatch(modules.action.loadData())
    }

    return { isServer }
  }

  render () {
    return <Page title="Index Page" linkTo="/other" NavigateTo="Other Page" />
  }
}

export default connect()(Index)
