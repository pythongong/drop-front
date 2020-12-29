import request from '@/util/request.js'

const url = '/service-vod/video'

export default{

    getVideo(id){
        return request({
            url: `${url}/getAuth/${id}`,
            method: 'get'
        })
    }
}