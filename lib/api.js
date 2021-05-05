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

async function request(config, req = {}, res = {}) {
  const { method = 'GET', url, data = {} } = config
  if (!url) throw Error('url must provider')
  try {
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
  } catch (error) {
    const { data = {}, status } = error.response || {}

    return {
      success: false,
      status,
      data,
      error: error.message,
    }
  }
}

module.exports = {
  request,
  requestGithub,
}
