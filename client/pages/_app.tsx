import App, { Container } from "next/app";
import React from "react";
import { Store } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { NextComponentType, NextContext, NextStaticLifecycle } from "next";
import createStore from "../store";
import { DefaultQuery, RouterProps } from "next-server/router";

interface AppProps<Q extends DefaultQuery = DefaultQuery> {
  Component: NextComponentType<any, any, NextContext<Q>>;
  router: RouterProps<Q>;
  store: Store<any[]>;
}

interface ContextType {
  Component: NextStaticLifecycle<{}, any>;
  ctx: Object;
}

class MyApp extends App<AppProps> {
  static async getInitialProps({ Component, ctx }: ContextType) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp));
