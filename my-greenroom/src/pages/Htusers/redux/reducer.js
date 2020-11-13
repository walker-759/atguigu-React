import {GETHTUSERLIST} from './constants'
const userlistinit = {
    total:0,
    item:[],
    pageIndex:1
}
export function userlist(state=userlistinit,action){
    switch(action.type){
        case GETHTUSERLIST:
            const result ={
                total:action.data.total,
                item:action.data.item,
                pageIndex:action.data.pageIndex
            }
            return result
        default :
            return state
    }
}