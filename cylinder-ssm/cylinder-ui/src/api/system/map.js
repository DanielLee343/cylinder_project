import request from '@/utils/request'

export function getAddress(params) {
    return request({
        baseURL: 'https://apis.map.qq.com/ws/geocoder/v1/',
        params: params,
        method: 'GET',
    })
}

export function getCldsDetail() {
    return request({
        url: '/system/admin_cld/getMove',
        method: 'get',
    })
}