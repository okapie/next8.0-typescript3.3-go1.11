import React from "react";
import { connect } from "react-redux";
import ButtonComponent from "../components/common/atoms/Button";
import { Dispatch } from "redux";
import modules from "../modules";
import { CtxType, OtherProps } from "../interfaces/pages"

class Other extends React.Component<OtherProps, {}> {
  static async getInitialProps(props: CtxType) {
    const { store, isServer } = props.ctx;

    // The following code is useful in case of null check for stored todos' list every time.
    // if (!store.getState().todos.list) {
    //   store.dispatch(modules.action.getTodosList());
    // }

    store.dispatch(modules.action.getTodosList());
    return { isServer };
  }

  render() {
    const { lists } = this.props.todos;
    return (
      <div>
        <ButtonComponent value='Information' onChange={() => {}} />
        <input value={"Dummy"} onChange={() => {}} />
        <ButtonComponent value='Add' onChange={() => {}} />
        <ButtonComponent value='Show List' onChange={() => {}} />
        <ul>{!lists.isFetching && lists.data.map(({ item }, index: number) => <li key={`item_${index}`}>{item}</li>)}</ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTodosList: () => dispatch(modules.action.getTodosList())
});

const mapStateToProps = (state: any) => {
  return {
  todos: {
    lists: state.todos.lists
  }
}};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Other);
