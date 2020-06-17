import request from '@/utils/request'

// admin查询cylinder数据列表
export function listCld(query) {
  return request({
    url: '/system/admin_cld/list',
    method: 'get',
    params: query
  })
}

// admin查询cylinder数据详细
export function getCld(id) {
  return request({
    url: '/system/admin_cld/' + id,
    method: 'get'
  })
}

// admin导出cylinder数据
export function exportCld(query) {
  return request({
    url: '/system/admin_cld/export',
    method: 'get',
    params: query
  })
}

export function getCldDetail(detailParams) {
  return request({
    url: '/system/admin_cld/getMove',
    method: 'get',
    params: detailParams,
  })
}

export function getAddress(params) {
  return request({
    baseURL: 'https://apis.map.qq.com/ws/geocoder/v1/',
    params: params,
    method: 'GET',
  })
}