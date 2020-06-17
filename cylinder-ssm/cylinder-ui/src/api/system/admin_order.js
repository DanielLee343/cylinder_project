import request from '@/utils/request'

// 查询order表列表
export function listOrder(query) {
  return request({
    url: '/system/admin_order/list',
    method: 'get',
    params: query
  })
}

// 查询order表单个数据
// export function getOrder(id) {
//   return request({
//     url: '/system/admin_order/' + id,
//     method: 'get'
//   })
// }

//查询order表详细（包含stampId）
export function getOrderDetail(orderNum) {
  return request({
    url: '/system/admin_order/detail/' + orderNum,
    method: 'get'
  })
}

// // 新增order表
// export function addOrder(data) {
//   return request({
//     url: '/system/order',
//     method: 'post',
//     data: data
//   })
// }

// // 修改order表
// export function updateOrder(data) {
//   return request({
//     url: '/system/order',
//     method: 'put',
//     data: data
//   })
// }

// // 删除order表
// export function delOrder(id) {
//   return request({
//     url: '/system/order/' + id,
//     method: 'delete'
//   })
// }

// 导出order表
export function exportOrder(query) {
  return request({
    url: '/system/admin_order/export',
    method: 'get',
    params: query
  })
}