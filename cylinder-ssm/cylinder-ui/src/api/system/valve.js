import request from '@/utils/request'

// 查询valve表列表
export function listValve(query) {
  return request({
    url: '/system/valve/list',
    method: 'get',
    params: query
  })
}

// 查询valve表详细
export function getValve(valveId) {
  return request({
    url: '/system/valve/' + valveId,
    method: 'get'
  })
}

// 新增valve表
export function addValve(data) {
  return request({
    url: '/system/valve',
    method: 'post',
    data: data
  })
}

// 修改valve表
export function updateValve(data) {
  return request({
    url: '/system/valve',
    method: 'put',
    data: data
  })
}

// 删除valve表
export function delValve(valveId) {
  return request({
    url: '/system/valve/' + valveId,
    method: 'delete'
  })
}

// 导出valve表
export function exportValve(query) {
  return request({
    url: '/system/valve/export',
    method: 'get',
    params: query
  })
}