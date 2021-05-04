import getConfig from 'next/config'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

const Title = styled.h1`
  font-size: 50px;
  color: #0f0;
`;

// 异步加载
const Comp = dynamic(import('../../components/comp'))

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

function Page(props) {
  
  console.log('serverRuntimeConfig', serverRuntimeConfig);
  console.log('publicRuntimeConfig', publicRuntimeConfig);
  
  return (
    <div>
      <Title>Chenwl</Title>
      <Comp>{props.time}</Comp>
      <p>{process.env.customKey}</p>
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  
  const moment = await import("moment");
  
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve({
        time: moment.default(Date.now()-60*1000).fromNow()
      })
    },100)
  })
  
}


export default Page
