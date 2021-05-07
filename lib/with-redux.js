import React from 'react'
import initializeStore from '../store/store'
import { isServer } from './utils'

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  if (isServer) {
    return initializeStore(initialState)
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }

  return window[__NEXT_REDUX_STORE__]
}

export default (Comp) => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }
    render() {
      const { Component, pageProps, ...rest } = this.props
      return (
        <Comp
          {...rest}
          Component={Component}
          pageProps={pageProps}
          reduxStore={this.reduxStore}
        />
      )
    }
  }

  WithReduxApp.getInitialProps = async (props) => {
    let reduxStore

    if (isServer) {
      const { req } = props.ctx
      const session = req.session

      if (session && session.userInfo) {
        reduxStore = getOrCreateStore({
          user: session.userInfo,
        })
      } else {
        reduxStore = getOrCreateStore()
      }
    } else {
      reduxStore = getOrCreateStore()
    }

    props.reduxStore = reduxStore

    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      try {
        appProps = await Comp.getInitialProps(props)
      } catch (error) {
          console.log("some Error===", error);
      }
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    }
  }

  return WithReduxApp
}
