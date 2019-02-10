import React from "react";
import { connect } from "react-redux";
import modules from "../modules";
import { Dispatch, Store } from "redux";
import { Task } from "redux-saga";
import ButtonComponent from "../components/common/atoms/Button";

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

interface PropsType {
  todos: {
    list: Array<string>;
  };
}

class Index extends React.Component<PropsType, {}> {
  static async getInitialProps(props: ContextType) {
    const { store, isServer } = props.ctx;

    if (!store.getState().placeholderData) {
      store.dispatch(modules.action.getTodosList());
    }

    return { isServer };
  }

  render() {
    const { list } = this.props.todos;
    console.log(list);
    return (
      <div>
        <ButtonComponent value='Information' onChange={() => {}} />
        <input value={"Dummy"} onChange={() => {}} />
        <ButtonComponent value='Add' onChange={() => {}} />
        <ButtonComponent value='Show List' onChange={() => {}} />
        <ul>
          <li>Dummy Todo</li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTodosList: () => dispatch(modules.action.getTodosList())
});

const mapStateToProps = (state: any) => ({
  todos: {
    list: state.todos.list
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
