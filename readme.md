# Nest.js 实现服务端渲染

## 使用 koa-session

### 配置
```js
const session = require('koa-session');
server.keys = ['some secret hurr']
const SESSION_CONFIG = {
    key: 'id.sess',
    maxAge: 86400000, 
}
server.use(session(SESSION_CONFIG, server))
```

### 设置和删除
```js
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
```

## 配合redis存储

### redis 结合 koa-session

```js
const session = require('koa-session');
const Redis = require("ioredis");
const redis = new Redis();

const RedisSessionStore = require("./server/session-store");

const SESSION_CONFIG = {
    key: 'id.sess',
    maxAge: 86400000, 
    store: new RedisSessionStore(redis),
}
```

### RedisSessionStore
```js
function getRedisSessionId(sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }
  // 获取Redis中存储的session数据
  async get(sid) {
    console.log('get session', sid)
    console.log('get session', sid)
    const id = getRedisSessionId(sid)
    const data = await this.client.get(id)
    if (!data) return null
    try {
      const result = JSON.parse(data)
      return result
    } catch (error) {
      console.error(error)
    }
  }
  // 存储session数据到redis
  async set(sid, sess, ttl) {
    console.log('set session', sid)

    const id = getRedisSessionId(sid)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
    }
    try {
      const sessStr = JSON.stringify(sess)
      if (ttl) {
        await this.client.setex(id, ttl, sessStr)
      } else {
        await this.client.set(id, sessStr)
      }
    } catch (error) {
      console.errror(errror)
    }
  }
  // 从redis 当中删除某个session
  async destroy(sid) {
    console.log('destroy session', sid)

    const id = getRedisSessionId(sid)
    await this.client.del(id)
  }
}

module.exports = RedisSessionStore;
```