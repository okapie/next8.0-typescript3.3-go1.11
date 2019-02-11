import React from "react";
import { connect } from "react-redux";
import { Dispatch, Store } from "redux";
import { Task } from "redux-saga";
import Page from "../components/page";

interface ContextType {
  ctx: {
    store: SagaType & Store<any>;
    isServer: boolean;
  };
}

interface SagaType {
  dispatch: Dispatch;
  runSagaTask?: () => void;
  sagaTask?: Task;
}

class Index extends React.Component {
  static async getInitialProps(props: ContextType) {
    const { isServer } = props.ctx;
    return { isServer };
  }

  render() {
    return <Page title='Other Page' linkTo='/other' NavigateTo='Index Page' />;
  }
}

export default connect()(Index);
