import request from '@/util/request'
const url = '/service-edu/teacher-front'

export default{

  getTeacherList(current,limit) {
    return request({
        url: `${url}/pageTeacher/${current}/${limit}`,
        method: 'get'
      })
  },

  getTeacherInfo(id){
    return request({
      url: `${url}/getTeacher/${id}`,
      method: 'get'
    })

  }
}