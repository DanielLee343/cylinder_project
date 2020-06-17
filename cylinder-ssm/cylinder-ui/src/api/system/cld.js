import request from '@/utils/request'

// entry查询cylinder数据列表
export function listCld(query) {
    return request({
        url: '/system/cld/list',
        method: 'get',
        params: query
    })
}

// entry查询cylinder数据详细
export function getCld(id) {
    return request({
        url: '/system/cld/' + id,
        method: 'get'
    })
}

// entry导出cylinder数据
export function exportCld(query) {
    return request({
        url: '/system/cld/export',
        method: 'get',
        params: query
    })
}

// 新增cylinder数据
export function addCld(data) {
    return request({
        url: '/system/cld',
        method: 'post',
        data: data
    })
}

// 修改cylinder数据
export function updateCld(data) {
    return request({
        url: '/system/cld',
        method: 'put',
        data: data
    })
}

// 删除cylinder数据
export function delCld(id) {
    return request({
        url: '/system/cld/' + id,
        method: 'delete'
    })
}