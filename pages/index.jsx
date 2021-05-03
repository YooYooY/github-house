import "../styles/index.css";
import Link from 'next/link'
import Router from 'next/router'
import { Button } from "antd";

function TestLink(){
    return (
      <Link href="/tab/query?id=1" as="/alias/1">
        <a>query</a>
      </Link>
    )
}
function TestRouter(){
    return <Button onClick={() => Router.push("/tab/query?name=2")}>Router</Button>
}

function TestPush(){
    const handlePush = ()=>{
        Router.push({
            pathname:"/tab/query",
            query:{
                name: "chenwl"
            }
        }, "push/chenwl")
    }
    return <Button onClick={handlePush}>test Push</Button>
}

export default () => (
  <span>
    <TestRouter></TestRouter> <TestLink></TestLink>
    <TestPush></TestPush>
  </span>
)