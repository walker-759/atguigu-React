import request from '@uti/request'

// 获取banner列表
export function getbanner() {
    // 返回promise
    return request({
        url: '/banner',
        method: 'GET'
    })
}


// 获取视频封面列表


export function getcover(pageIndex) {
    return request({
        url: '/coverlist',
        method: "GET",
        params: {
            pageIndex
        }
    })
}



