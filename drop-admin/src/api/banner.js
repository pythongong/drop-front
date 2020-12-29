import request from '@/utils/request'

const url='/service-cms/banner-admin'
export default {
  //1 修改banner
  updateBanner(banner){
    return request({
      url: `${url}/update`,
      method: 'put',
      data: banner
    })
  },

  //2 添加banner
  addBanner(banner){
    return request({
      url: `${url}/save`,
      method: 'post',
      data: banner
    })
  },

  //3 删除banner
  deleteBannerById(id){
    return request({
      url: `${url}/delete/${id}`,
      method: 'delete'
    })
  },

  //4 分页查询banner
  //current 当前页    limit 每页记录数
  getBannerList(page,limit){
    return request({
      url: `${url}/${page}/${limit}`,
      method: 'get',
    })
  },

  //5.根据课程id查询banner
  getBannerInfo(id){
    return request({
      url: `${url}/get/${id}`,
      method: 'get'
    })
  },
}
