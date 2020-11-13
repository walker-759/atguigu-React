import {LOGIN , LOGOUT} from '../constants/constants'
// 从缓存拿到token
const data =JSON.parse(localStorage.getItem('HTusertoken'));

// 初始化reducer
const logininit={
    token:data?data.token:'',
    userName:data?data.userName:''
}
export function logindata (state=logininit,action){
    switch(action.type){
        // 登录
        case LOGIN:
            return {
                token:action.data.token,
                userName:action.data.userName
            }
        // 登出
        case LOGOUT :
            return {
                token:'',
                userName:''
            }
        default :
            return state
    }
}