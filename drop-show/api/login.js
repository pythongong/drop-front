import request from '@/util/request'

const url = '/service-user'

export default {
  //登录
  submitLogin(userInfo) {
    return request({
      url: `${url}/login`,
      method: 'post',
      data: userInfo
    })
  },
  //根据token获取用户信息
  getLoginInfo() {
    return request({
      url: `${url}/getUserInfo`,
      method: 'get',
     // headers: {'token': cookie.get('guli_token')}
    })
    //headers: {'token': cookie.get('guli_token')} 
  }
}