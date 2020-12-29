import axios from 'axios'
import cookie from 'js-cookie'

const service = axios.create({
    baseURL: 'http://localhost:9100',
    timeout: 20000
})

export default service

// http request 拦截器
service.interceptors.request.use(
    config => {
    //debugger
    if (cookie.get('user_token')) {
      config.headers['token'] = cookie.get('user_token');
    }
      return config
    },
    err => {
    return Promise.reject(err);
  })