// import {MENUBARSTATUS} from './constants'
// const menustatusinit={
//     num:false
// }
// export function menustatus(state=menustatusinit,action){
//     switch(action.type){
//         case MENUBARSTATUS:
//             return {
//                 num:action.data
//             }
//         default :
//             return state
//     }
// }

import {GETBANNERLIST ,GETCOVERLIST} from './constants'
const bannerListinit = {
    bannerlist:[],
    cover:{
        coverList:[],
        pageIndex:0,
        pageSum:0
    }
}
export function home(state=bannerListinit,action){
    switch(action.type){
        case GETBANNERLIST:
            return {...state,bannerlist:action.data.bannerList}
        case GETCOVERLIST:
            return {...state,cover:{coverList:[...state.cover.coverList,...action.data.coverList],pageIndex:action.data.pageIndex,pageSum:action.data.pageSum}}
        default :
            return state
    }
}

// {bannerlist:action.data.bannerList}