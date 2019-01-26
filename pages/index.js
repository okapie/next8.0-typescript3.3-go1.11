import React from 'react'
import { connect } from 'react-redux'
import modules from "../modules"
import Page from '../components/page'

class Index extends React.Component {
  static async getInitialProps (props) {
    const { store, isServer } = props.ctx

    if (!store.getState().placeholderData) {
      store.dispatch(modules.action.loadData())
    }

    return { isServer }
  }

  render () {
    return <Page title='Index Page' linkTo='/other' NavigateTo='Other Page' />
  }
}

export default connect()(Index)
