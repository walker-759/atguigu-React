import request from '@utils/request'

// 用户登录
export function userlogin(userName,passWord) {
    // 返回promise
    return request({
        url: '/htlogin',
        method: 'POST',
        data:{
            userName,
            passWord
        }
    })
}


// 获取视频封面列表


// export function getcover(pageIndex) {
//     return request({
//         url: '/coverlist',
//         method: "GET",
//         params: {
//             pageIndex
//         }
//     })
// }



