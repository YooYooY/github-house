import { Alert, Button, Icon } from 'antd'
const config = require('../config')
const api = require('../lib/api')
import { connect } from 'react-redux'

const Index = ({ data, error, isLogin, user }) => {
  if (error) {
    return <Alert message={data.message} type="error" showIcon closable />
  }
  if (!user || !user.id) {
    return (
      <div className="root">
        <p>亲！你还没登录哦~</p>
        <Button type="primary" href={config.OAUTH_URL}>
          点击登录
        </Button>
        <style jsx>{`
          .root {
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
  console.log(user)

  return <div className="root">
    <div className="user-info">
      <img src={user.avatar_url} alt="user avatar" className="avatar" />
      <span className="login">{user.login}</span>
      <span className="name">{user.name}</span>
      <span className="bio">{user.bio}</span>
      <p className="email">
        <Icon type="mail" style={{marginRight: 10}} />
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>
    </div>
    <div className="user-repos">
      <p>User Repos</p>
    </div>
    <style jsx>{`
      .root{
        display:flex;
        align-items: flex-start;
        padding: 20px 0;
      }
      .user-info{
        width:200px;
        margin-right: 40px;
        flex-shrink:0;
        display: flex;
        flex-direction:column;
      }
      .login{
        font-weight: 800;
        font-size: 20px;
        margin-top:20px;
      }
      .name{
        font-size: 16px;
        color: #777;
      }
      .bio{
        margin-top: 20px;
        color: #333
      }
      .avatar{
        width: 100%;
        border-radius: 5px;
      }
    `}</style>
  </div>
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

  const [userRepos, userStaredRepos] = data.map((item) => item.data)

  return {
    isLogin: true,
    userRepos,
    userStaredRepos,
  }
}

export default connect((state) => state)(Index)
