import { request } from './request'

export function getGoodsData() {
    return request({
        url: '/api/goods',
        // method: 'get',
        // params: {

        // }
    })
}

export function getCategoryGoods(sort = "sales", childId = 0, page = 1) {
    return request({
        url: `/api/goods?category_id=${childId}&page=${page}&${sort}=1`,
    })
}