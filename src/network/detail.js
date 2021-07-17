import { request } from './request'

export function getDetailData(good) {
    return request({
        url: `/api/goods/${good}`,
    })
}

