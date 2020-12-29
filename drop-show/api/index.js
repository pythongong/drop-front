import request from '@/util/request.js'

const url = '/service-edu/front'
export default{
    getList() {
        return request({
          url: `${url}/index`,
          method: 'get'
        })
      }
}