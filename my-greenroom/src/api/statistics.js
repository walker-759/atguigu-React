import request from '@utils/request'
// 用户登录
export function getusercount() {
    // 返回promise
    return request({
        url: '/htusercount',
        method: 'GET'
    })
}