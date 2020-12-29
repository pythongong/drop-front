import request from '@/utils/request'

const api_name = '/service-edu/video'

export default{

    getAll(courseId) {
        return request({
            url: `${api_name}/getAll/${courseId}`,
            method: 'get'
          })
    },

    save(video){
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: video
        })
    },

    get(id){
        return request({
            url: `${api_name}/get/${id}`,
            method: 'get'
        })
    },
    
    update(video){
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: video
        })
    },

    delete(id){
        return request({
            url: `${api_name}/delete/${id}`,
            method: 'delete'
        })
    },

    deleteVod(id){
        return request({
            url: `/service-vod/video/delete/${id}`,
            method: 'delete'
        })
    }
}