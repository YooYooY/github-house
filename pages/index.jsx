import { Alert, Button, Icon, Tabs } from 'antd'
import { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import Repo from '../components/Repo'
import { withRouter } from 'next/router'
import LRU from 'lru-cache'
import { isServer } from '../lib/utils'
import { cacheArray } from '../lib/repo-basic-cache'

const config = require('../config')
const api = require('../lib/api')

const cache = new LRU({
  maxAge: 1000 * 60 * 10,
})

const Index = ({ data, error, user, userRepos=[], userStaredRepos=[], router }) => {
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

  const tabKey = router.query.key || '1'

  const handleTabChange = useCallback((activeKey) => {
    router.push(`/?key=${activeKey}`)
  }, [])

  useEffect(() => {
    if (!isServer) {
      cacheArray(userRepos)
      cacheArray(userStaredRepos)
      cache.set('userRepos', userRepos)
      cache.set('userStaredRepos', userStaredRepos)
    }
  }, [isServer, userRepos, userStaredRepos])

  return (
    <div className="root">
      <div className="user-info">
        <img src={user.avatar_url} alt="user avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
          <Icon type="mail" style={{ marginRight: 10 }} />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
      </div>
      <div className="user-repos">
        <Tabs
          defaultActiveKey={tabKey}
          onChange={handleTabChange}
          animated={false}
        >
          <Tabs.TabPane tab="你的仓库" key="1">
            {userRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {userStaredRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          align-items: flex-start;
          padding: 20px 0;
        }
        .user-info {
          width: 200px;
          margin-right: 40px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }
        .login {
          font-weight: 800;
          font-size: 20px;
          margin-top: 20px;
        }
        .name {
          font-size: 16px;
          color: #777;
        }
        .bio {
          margin-top: 20px;
          color: #333;
        }
        .avatar {
          width: 100%;
          border-radius: 5px;
        }
        .user-repos {
          flex-grow: 1;
        }
      `}</style>
    </div>
  )
}

function getAllData(ctx) {
  return Promise.all([
    api.request({ url: '/user/repos' }, ctx.req, ctx.res),
    api.request({ url: '/user/starred' }, ctx.req, ctx.res),
  ])
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  const { user } = reduxStore.getState()
  let isLogin = false

  if (!user || !user.id) return { data: [], isLogin }

  isLogin = true

  if (!isServer) {
    const userRepos = cache.get('userRepos')
    const userStaredRepos = cache.get('userStaredRepos')
    if (userRepos && userStaredRepos) {
      return {
        isLogin,
        userRepos,
        userStaredRepos,
      }
    }
  }

  const data = await getAllData(ctx)
  const [userRepos, userStaredRepos] = data.map((item) => item.data)

  return {
    isLogin,
    userRepos,
    userStaredRepos,
  }
}

export default withRouter(connect((state) => state)(Index))
