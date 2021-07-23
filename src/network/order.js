import { request } from "./request";

export function orderPreview() {
    return request({
        url: '/api/orders/preview'
    })
}

export function submitOrder(data) {
    return request({
        url: '/api/orders',
        method: 'post',
        data
    })
}

export function getOrderList(data) {
    return request({
        url: '/api/orders?' + data,
    })
}

//订单详情
export function getOrderDetail(orderId, data) {
    return request({
        url: `/api/orders/${orderId}?` + data
    })
}