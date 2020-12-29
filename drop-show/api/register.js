import request from '@/util/request'
const url = '/service-user'

export default{
    submitRegister(userForm) {
        return request({
          url: `${url}/register`,
          method: 'post',
          data: userForm
        })
      }
}