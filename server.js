const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require("ioredis");
const RedisSessionStore = require("./server/session-store");

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// 创建redis client
const redis = new Redis();

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

  server.use(async (ctx, next) => {
    if(ctx.session.user){
      console.log('session is: ', ctx.session.user)
    }else{
      console.log("session nul***");
    }
    await next()
  })

  router.get('/set/user', async (ctx) => {
    ctx.session.user = {
      name: 'chenwl',
      age: 23,
    }
    ctx.body = 'ser user success'
  })
  router.get("/delete/user", async ctx=>{
    ctx.session = null;
    ctx.body = "set session success";
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
