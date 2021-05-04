const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const RedisSessionStore = require('./server/session-store')
const auth = require('./server/auth')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// 创建redis client
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.keys = ['Chenwl develop Github App']
  const SESSION_CONFIG = {
    key: 'cc',
    // maxAge: 30*60*60*1000,
    store: new RedisSessionStore(redis),
  }
  server.use(session(SESSION_CONFIG, server))

  auth(server)

  router.get('/api/user/info', async (ctx) => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login';
      return;
    }
    ctx.body = ctx.session.userInfo
    ctx.set("Content-Type", "application/json");
  })

  router.get('/query/:name', async (ctx) => {
    const { name } = ctx.params
    await handle(ctx.req, ctx.res, {
      pathname: '/tab/query',
      query: { name },
    })
    ctx.respond = false
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})
