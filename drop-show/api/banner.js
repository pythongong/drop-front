import request from '@/util/request.js'

const url = '/service-cms/banner-front'
export default{
    getList() {
        return request({
          url: `${url}/getAll`,
          method: 'get'
        })
      }
}