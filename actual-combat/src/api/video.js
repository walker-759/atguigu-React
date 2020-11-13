import request from '@uti/request'

// 获取视频详细数据
export function getvideo(id) {
    // 返回promise
    return request({
        url: '/video',
        method: 'GET',
        params: {
            id
        }
    })
}


// 获取评论信息
export function getcomments(pageIndex, videoId) {
    // 返回promise
    return request({
        url: '/comments',
        method: 'GET',
        params: {
            pageIndex,
            videoId,
        }
    })
}


// 添加评论信息

// const result = await request({
//     url: '/comments',
//     method: 'POST',
//     data: {
//         comments: this.state.comments,
//         videoId: this.state.videoId,
//         commentsImgArr: filarr
//     }
// })
export function addcomments({comments,videoId,commentsImgArr}){
    return request({
        url:'/comments',
        method:'POST',
        data:{
            comments,
            videoId,
            commentsImgArr
        }
    })
}