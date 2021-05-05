const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const koaBody = require('koa-body')

const RedisSessionStore = require('./server/session-store')
const auth = require('./server/auth')
const api = require('./server/api')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// 创建redis client
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.use(koaBody())

  server.keys = ['Chenwl develop Github App']
  const SESSION_CONFIG = {
    key: 'cid',
    // maxAge: 30*60*60*1000,
    store: new RedisSessionStore(redis),
  }
  server.use(session(SESSION_CONFIG, server))

  auth(server)
  api(server)

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
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})
