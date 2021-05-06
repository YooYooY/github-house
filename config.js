// const GITHUB_URL = 'https://github.com'
// const GITHUB_BASE_URL = 'https://api.github.com'

const GITHUB_URL = 'http://localhost:3001'
const GITHUB_BASE_URL = 'http://localhost:3001'

const GITHUB_OAUTH_URL = `${GITHUB_URL}/login/oauth/authorize`
const SCOPE = 'user'

const github = {
  request_token_url: `${GITHUB_URL}/login/oauth/access_token`,
  client_id: 'd5a49053b41d26ca825c',
  client_secret: 'd9e8478df3394d34409f27002212dbfec610d8c0',
  code: 'c895fd9f4a2520c94d0b',
}

module.exports = {
  github,
  GITHUB_OAUTH_URL,
  GITHUB_BASE_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${github.client_id}&scope=${SCOPE}`,
}

