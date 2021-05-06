const axios = require('axios')
const config = require('../config')

const { client_id, client_secret, request_token_url } = config.github

module.exports = (server) => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exit'
        return
      }

      try {
        const result = await axios({
          method: 'POST',
          url: request_token_url,
          data: {
            client_id,
            client_secret,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        })

        if (result.status === 200 && result.data && !result.data.error) {
          ctx.session.githubAuth = result.data
          const { access_token, token_type } = result.data
          const userInfoResp = await axios({
            method: 'GET',
            url: config.GITHUB_BASE_URL+'/user',
            headers: {
              Authorization: `${token_type} ${access_token}`,
            },
          })

          ctx.session.userInfo = userInfoResp.data

          const { urlBeforeOAuth } = ctx.session
          const redirectUrl = urlBeforeOAuth ? urlBeforeOAuth : '/'
          ctx.redirect(redirectUrl)
          ctx.session.urlBeforeOAuth = null
        } else {
          const errorMsg = result.data && result.data.error
          ctx.body = `request token failed ${errorMsg}`
        }
      } catch (error) {
        ctx.body = `catch axios error ${error.message}`
      }
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method.toLowerCase()
    if (path === '/logout' && method === 'post') {
      ctx.session = null
      ctx.body = 'logout success'
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method.toLowerCase()
    if (path === '/prepare-auth' && method === 'get') {
      const { url } = ctx.query
      ctx.session.urlBeforeOAuth = url
      ctx.redirect(config.OAUTH_URL)
    } else {
      await next()
    }
  })
}
