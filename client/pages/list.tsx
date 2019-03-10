import React, { useState } from "react";
import { connect } from "react-redux";
import ButtonComponent from "../components/common/atoms/Button";
import { Dispatch } from "redux";
import modules from "../modules";
import { CtxType, ListProps } from "../interfaces/pages"

const List = ({ todos, postTodo }: ListProps) => {
  const { list } = todos;
  const [ inputText, setInputText ] = useState("");

  const handlerAddTodo = () => postTodo(inputText);

  return (
    <div>
      <input value={inputText} onChange={e => {
        setInputText(e.target.value)
      }} />
      <ButtonComponent value='Add' onClick={() => handlerAddTodo()} />
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
  getTodosList: () => dispatch(modules.action.getTodosList()),
  postTodo: (text: string) => dispatch(modules.action.postTodo(text))
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
