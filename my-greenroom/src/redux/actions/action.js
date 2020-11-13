import {LOGIN ,LOGOUT} from '../constants/constants'
import {userlogin} from '@api/login'

// 登录同步
const userloginsuccess = (data)=>{
    return {
        type:LOGIN,
        data
    }
}

// 登录异步
export const ulogin = (userName,passWord)=>{
    return dispatch=>{
        return userlogin(userName,passWord).then(res=>{
            dispatch(userloginsuccess(res))
            return res
        })
    }
}


// 退出登录  同步
export const logout=()=>{
    return dispatch=>{
        dispatch({
            type:LOGOUT,
            data:{
                token:'',
                userName:''
            }
        })
    }
} 