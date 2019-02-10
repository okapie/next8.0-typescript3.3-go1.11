import React from "react";
import { connect } from "react-redux";

import Page from "../components/page";

interface ContextType {
  ctx: {
    isServer: boolean;
  };
}

class Other extends React.Component {
  static async getInitialProps(props: ContextType) {
    const { isServer } = props.ctx;
    return { isServer };
  }

  render() {
    return <Page title='Other Page' linkTo='/' NavigateTo='Index Page' />;
  }
}

export default connect()(Other);
