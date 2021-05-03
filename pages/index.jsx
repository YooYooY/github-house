import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { useCallback } from 'react'
import { connect } from 'react-redux'

import * as actions from '../store/actions'

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete',
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach((event) => {
  Router.events.on(event, makeEvent(event))
})

function TestLink() {
  return (
    <Link href="/tab/query?id=1" as="/query/1">
      <a>query</a>
    </Link>
  )
}
function TestRouter() {
  return (
    <Button onClick={() => Router.push('/tab/query?name=2')}>Router</Button>
  )
}

function TestPush() {
  const handlePush = () => {
    Router.push(
      {
        pathname: '/tab/query',
        query: {
          name: 'chenwl',
        },
      },
      'query/chenwl'
    )
  }
  return <Button onClick={handlePush}>test Push</Button>
}

const Index = (props) => {
  
  const handleChange = useCallback((e)=>{
    props.changeName(e.target.value.trim())
  },[])
  
  return (
    <span>
      <Button onClick={() => props.add()}>add</Button>
      <input type="text" value={props.user.username} onChange={handleChange} />
      <p>{props.count.count}</p>
      <p>{props.user.username}</p>
      <TestRouter />
      <TestLink />
      <TestPush />
    </span>
  )
}

Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(actions.add(12))
  console.log(reduxStore.getState())
  return {}
}

export default connect((state) => state, actions)(Index)
