import { Alert } from 'antd'
const api = require('../lib/api')

const Index = ({ data, error }) => {
  if (error) {
    return <Alert message={data.message} type="error" showIcon closable />
  }

  // console.log(data);

  return <div></div>
}

function getAllData(ctx) {
  return Promise.all([
    api.request({ url: '/user/repos' }, ctx.req, ctx.res),
    api.request({ url: '/user/starred' }, ctx.req, ctx.res),
  ])
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  console.log('reduxStore===')

  const { user } = reduxStore.getState()

  if (!user || !user.id) return { data: [], isLogin: false }

  const data = await getAllData(ctx)

  return {
    data: data.map((item) => item.data),
  }
}

export default Index
