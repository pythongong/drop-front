import request from '@/utils/request'

const url = 'service-statistics'
export default {
    //1 生成统计数据
    createStaData(day) {
        return request({
            url: `${url}/getRegister/${day}`,
            method: 'post'
          })
    },
    //2 获取统计数据
    getDataSta(searchObj) {
        return request({
            url: `${url}/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get'
          })
    }
}