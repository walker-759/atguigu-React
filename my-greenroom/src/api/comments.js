import request from '@utils/request'
// 获取评论列表
export function gethtuserlist(videoId) {
    // 返回promise
    return request({
        url: '/htgetcomments',
        method: 'GET',
        params:{
            videoId
        }
    })
}