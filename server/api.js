const axios = require('axios')
const { requestGithub } = require('../lib/api')

module.exports = (server) => {
  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path.startsWith('/github/')) {
      const githubAuth = ctx.session.githubAuth || {}
      const { access_token, token_type } = githubAuth
      let headers = {}
      if (access_token) {
        headers['Authorization'] = `${token_type} ${access_token}`
      }

      const { status, data } = await requestGithub(
        method,
        ctx.url.replace('/github/', '/'),
        {},
        headers
      )

      ctx.status = status
      ctx.body = data
    } else {
      await next()
    }
  })
}

// module.exports = (server) => {
//   server.use(async (ctx, next) => {
//     const { url } = ctx
//     if (url.startsWith('/github/')) {
//       const githubAuth = ctx.session.githubAuth || {}
//       const githubPath = `${GITHUB_BASE_URL}${url.replace('/github/', '/')}`

//       const { access_token, token_type } = githubAuth
//       let headers = {}
//       if (access_token) {
//         headers['Authorization'] = `${token_type} ${access_token}`
//       }

//       try {
//         const result = await axios({
//           method: 'GET',
//           url: githubPath,
//           headers,
//         })
//         if (result.status === 200) {
//           ctx.body = result.data
//         } else {
//           ctx.status = result.status
//           ctx.body = {
//             success: false,
//             data: result.data
//           }
//         }
//       } catch (err) {
//         ctx.body = {
//           success: false,
//           error: err.message,
//         }
//       }
//     } else {
//       await next()
//     }
//   })
// }
