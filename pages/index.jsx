import axios from 'axios'
import {useEffect} from 'react'
const api = require("../lib/api");

const Index = (props) => {
  console.log("index-props",props);
  useEffect(()=>{
    axios.post("/github/test",{name:"chenwl"})
  },[])
  return <span>index</span>
}

Index.getInitialProps = async (ctx) => {
  const result = await api.request(
    { url: '/search/repositories?q=react' },
    ctx.req,
    ctx.res
  )

  return {
    data: result.data
  }
}

export default Index
