import request from '@utils/request'

// 获取后台用户列表
export function gethtuserlist(pageIndex) {
    // 返回promise
    return request({
        url: '/htuserlist',
        method: 'get',
        params:{
            pageIndex
        }
    })
}

// 增加新用户
export function addhtuser(userName,passWord){
    return request({
        url:'/addhtuser',
        method:'POST',
        data:{
            userName,
            passWord
        }
    })
}

// 修改用户信息
export function updateuser(id,passWord){
    return request({
        url:'/updateuser',
        method:'PUT',
        data:{
            id,
            passWord
        }
    })
}

// 删除账号

export function deleteuser(id){
    return request({
        url:'/deleteuser',
        method:'DELETE',
        params:{
            id
        }
    })
}
