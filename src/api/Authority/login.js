// const login ='http://192.168.22.54:8081/auth-web/access/login'
const login = process.env.VUE_APP_lOGIN_URL
const fastDingLogin = process.env.VUE_APP_FAST_DING_lOGIN_URL
export {
    login, fastDingLogin
}
  