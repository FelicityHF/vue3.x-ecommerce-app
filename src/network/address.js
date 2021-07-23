import { request } from "./request";

export function getAddressList() {
    return request({
        url: '/api/address'
    })
}

export function addAddress(data) {
    return request({
        url: '/api/address',
        method: 'post',
        data
    })
}

//获取地址详情
export function getAddressDetail(id) {
    return request({
        url: `/api/address/${id}`
    })

}

//更新地址
export function updateAddress(id, data) {
    return request({
        url: `/api/address/${id}`,
        method: 'put',
        data
    })
}

//设置为默认地址
export function setDefault(id) {
    return request({
        url: `/api/address/${id}/default`,
        method: 'patch'
    })
}


//删除地址
export function deleteAddress(id) {
    return request({
        url: `/api/address/${id}`,
        method: 'delete'
    })
}