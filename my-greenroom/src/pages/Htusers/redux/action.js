import {GETHTUSERLIST} from './constants'
import {gethtuserlist} from '@api/htuser'

// 获取用户列表异步
export const gethtuser = (pageIndex)=>{
    return dispatch=>{
        return gethtuserlist(pageIndex).then(res=>{
            dispatch(gethtusersuccess(res))
        })
    }
}

// 获取用户列表同步
const gethtusersuccess = (data)=>{
    return {
        type:GETHTUSERLIST,
        data
    }
}