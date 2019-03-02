import React from "react";
import { connect } from "react-redux";
import Page from "../components/page";
import { CtxType } from "../interfaces/pages";

class Index extends React.Component {
  static async getInitialProps(props: CtxType) {
    const { isServer } = props.ctx;
    return { isServer };
  }

  render() {
    return <Page title='Other Page' linkTo='/other' NavigateTo='Index Page' />;
  }
}

export default connect()(Index);
