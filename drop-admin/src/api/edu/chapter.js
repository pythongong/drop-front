import request from '@/utils/request'

const api_name = '/service-edu/chapter'

export default{

    getAll(courseId) {
        return request({
            url: `${api_name}/getAll/${courseId}`,
            method: 'get'
          })
    },

    save(chapter){
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: chapter
        })
    },

    get(id){
        return request({
            url: `${api_name}/get/${id}`,
            method: 'get'
        })
    },
    
    update(chapter){
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: chapter
        })
    },

    delete(id){
        return request({
            url: `${api_name}/delete/${id}`,
            method: 'delete'
        })
    }
}