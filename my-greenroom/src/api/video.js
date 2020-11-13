import request from '@utils/request'

// 获取video封面列表
export function getcoverlist(pageIndex) {
    // 返回promise
    return request({
        url: '/htcoverlist',
        method: 'GET',
        params: {
            pageIndex
        }
    })
}

// 获取视频详细数据

export function getvideo(id) {
    // 返回promise
    return request({
        url: '/htgetvideo',
        method: 'GET',
        params: {
            id
        }
    })
}

// 获取七牛云token
export function reqGetqiniutoken() {
    return request({
        url: `/uploadtoken`,
        method: "GET",
    });
}

// 添加视频
export function addvideo({id,videoCover,videoName,videoLength,videoUrl}){
    return request ({
        url:'/htaddvideo',
        method:'POST',
        data:{
            id,videoCover,videoName,videoLength,videoUrl
        }
    })
}
// 删除视频和视频封面
export function htremovevideo(id){
    return request ({
        url:'/htremovevideo',
        method:'DELETE',
        params:{
            id
        }
    })
}

