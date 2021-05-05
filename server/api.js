const axios = require('axios')
const github_base_url = 'https://api.github.com'

module.exports = (server) => {
  server.use(async (ctx, next) => {
    const { url } = ctx
    if (url.startsWith('/github/')) {
      const githubAuth = ctx.session.githubAuth || {}
      const githubPath = `${github_base_url}${url.replace('/github/', '/')}`

      const { access_token, token_type } = githubAuth
      let headers = {}
      if (access_token) {
        headers['Authorization'] = `${token_type} ${access_token}`
      }

      try {
        const result = await axios({
          method: 'GET',
          url: githubPath,
          headers,
        })
        if (result.status === 200) {
          ctx.body = result.data
        } else {
          ctx.status = result.status
          ctx.body = {
            success: false,
            data: result.data
          }
        }
      } catch (err) {
        ctx.body = {
          success: false,
          error: err.message,
        }
      }
    } else {
      await next()
    }
  })
}
