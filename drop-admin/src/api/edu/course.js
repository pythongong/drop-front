import request from '@/utils/request'

const api_name = '/service-edu/course'

export default{

    getAllCourses() {
        return request({
            url: `${api_name}/getAll`,
            method: 'get'
          })
    },

    addCourse(courseInfo){
        return request({
            url: `${api_name}/add`,
            method: 'post',
            data: courseInfo
        })
    },

    getCourseById(courseId){
        return request({
            url: `${api_name}/get/${courseId}`,
            method: 'get'
        })
    },

    updateCourse(courseInfo){
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: courseInfo
        })
    },

    getPublisInfor(courseId){
        return request({
            url: `${api_name}/getPublishInfo/${courseId}`,
            method: 'get'
        })
    },

    publish(courseId){
        return request({
            url: `${api_name}/publish/${courseId}`,
            method: 'put'
        })
    },

    delete(courseId){
        return request({
            url: `${api_name}/delete/${courseId}`,
            method: 'delete'
        })
    }

}