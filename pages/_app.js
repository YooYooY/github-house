import App, { Container } from 'next/app'
import Layout from '../components/Layout'
import PageLoading from '../components/PageLoading'
import '../styles/index.css'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import withRedux from '../lib/with-redux'
import Router from 'next/router'

const { OAUTH_URL } = require('../config')

class MyApp extends App {
  state = {
    loading: false,
  }
  startLoading = () => {
    this.setState({
      loading: true,
    })
  }
  stopLoading = () => {
    this.setState({
      loading: false,
    })
  }

  componentDidMount() {
    if(!this.props.isLogin){
      Router.router.replace(OAUTH_URL)
    }
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }
  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }

  static async getInitialProps(props) {
    const { Component } = props
    let pageProps = {};
    let isLogin = true;
    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(props)
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;
          if(status === 401){
             isLogin = false;
          }
        }
      }
    }
    return {
      pageProps,
      isLogin,
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <Provider store={reduxStore}>
          {this.state.loading && <PageLoading />}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(MyApp)
