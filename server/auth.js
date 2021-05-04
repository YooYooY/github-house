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

      try{
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
          console.log('token result', result.data)

          if (result.status === 200 && result.data && !result.data.error) {
            ctx.session.githubAuth = result.data;
            const {access_token, token_type }= result.data;
            const userInfoResp = await axios({
                method:"GET",
                url:"https://api.github.com/user",
                headers:{
                    "Authorization": `${token_type} ${access_token}`
                }
            });
            
            ctx.session.userInfo = userInfoResp.data;
            
            ctx.redirect('/')
          } else {
              console.log("some error");
            const errorMsg = result.data && result.data.error
            ctx.body = `request token failed ${errorMsg}`
          }
      }catch(error){
          console.log(error);
           ctx.body = `catch axios error ${error.message}`
      }
      
      
      
    } else {
      await next()
    }
  })
}
