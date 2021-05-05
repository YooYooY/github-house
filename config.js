const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'

const github = {
  request_token_url: 'https://github.com/login/oauth/access_token',
  client_id: 'd5a49053b41d26ca825c',
  client_secret: 'd9e8478df3394d34409f27002212dbfec610d8c0',
  code: 'c895fd9f4a2520c94d0b',
}

module.exports = {
  github,
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${github.client_id}&scope=${SCOPE}`,
};

