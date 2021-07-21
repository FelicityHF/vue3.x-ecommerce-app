import { request } from './request'

//添加商品到购物车
export function addCart(data) {
    return request({
        url: '/api/carts',
        method: 'post',
        data
    })
}

//改变购物车商品数量 data = {num: 1}
export function modifyCart(id, data) {
    return request({
        url: `/api/carts/${id}`,
        method: 'put',
        data
    })
}

//选择商品状态
export function checkedCart(data) {
    return request({
        url: '/api/carts/checked',
        method: 'patch',
        data
    })
}

//获取购物车列表
export function getCartList(data) {
    return request({
        url: '/api/carts?' + data,
    })
}

//移除购物车商品
export function removeCartItem(id) {
    return request({
        url: `/api/carts/${id}`,
        method: 'delete',
    })
}