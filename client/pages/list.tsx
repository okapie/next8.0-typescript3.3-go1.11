import React from "react";
import { connect } from "react-redux";
import ButtonComponent from "../components/common/atoms/Button";
import { Dispatch } from "redux";
import modules from "../modules";
import { CtxType, ListProps } from "../interfaces/pages"

const List = ({ todos }: ListProps) => {
  const { list } = todos;
  return (
    <div>
      <ButtonComponent value='Information' onChange={() => {}} />
      <input value={"Dummy"} onChange={() => {}} />
      <ButtonComponent value='Add' onChange={() => {}} />
      <ButtonComponent value='Show List' onChange={() => {}} />
      <ul>{!list.isFetching && list.data.map(({ item }, index: number) => <li key={`item_${index}`}>{item}</li>)}</ul>
    </div>
  );
}

List.getInitialProps = async (props: CtxType) => {
  const { store, isServer } = props.ctx;

  // The following code is useful in case of null check for stored todos' list every time.
  // if (!store.getState().todos.list) {
  //   store.dispatch(modules.action.getTodosList());
  // }

  store.dispatch(modules.action.getTodosList());

  return {
    isServer,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTodosList: () => dispatch(modules.action.getTodosList())
});

const mapStateToProps = (state: any) => {
  return {
  todos: {
    list: state.todos.list
  }
}};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
