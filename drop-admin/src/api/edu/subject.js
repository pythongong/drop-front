import request from '@/utils/request'

const api_name = '/service-edu/subject'

export default{
    getAllSubjects() {
        return request({
            url: `${api_name}/getAllSubjects`,
            method: 'get'
          })
    }
}