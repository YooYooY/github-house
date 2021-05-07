const axios = require('axios')
const { GITHUB_BASE_URL } = require('../config')
const isServer = typeof window === 'undefined'

async function requestGithub(method, url, data = {}, headers) {
  return await axios({
    method,
    url: `${GITHUB_BASE_URL}${url}`,
    data,
    headers,
  })
}

async function request(config, ctx) {
  const { method = 'GET', url, data = {} } = config
  const { req, res } = ctx
  if (!url) throw Error('url must provider')
  if (isServer) {
    const headers = {}

    if (
      req.session &&
      req.session.githubAuth &&
      req.session.githubAuth.access_token
    ) {
      const { access_token = '', token_type = '' } = req.session.githubAuth
      headers['Authorization'] = `${token_type} ${access_token}`
    }

    return await requestGithub(method, url, data, headers)
  } else {
    return await axios({
      method,
      url: `/github${url}`,
      data,
    })
  }
}

module.exports = {
  request,
  requestGithub,
}
