import request from '@/util/request.js'

const url = '/service-edu/course-front'

export default{

    getCourseList(current,limit, searchObj) {
      return request({
          url: `${url}/getFrontCourseList/${current}/${limit}`,
          method: 'post',
          data: searchObj
        })
    },
  
    getCourseInfo(id){
      return request({
        url: `${url}/getFrontCourseInfo/${id}`,
        method: 'get'
      })
  
    },

    getAllSubjects() {
        return request({
            url: `/service-edu/subject/getAllSubjects`,
            method: 'get'
        })
    }


  }