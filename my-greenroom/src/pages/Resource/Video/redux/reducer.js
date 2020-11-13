import { GETCOVERLIST } from './constants'
const coverinit = {
    total:0,
    pageIndex:1,
    item:[]
}
export function cover(state=coverinit,action){
    switch (action.type){
        case GETCOVERLIST:
            return {
                total:action.data.total,
                pageIndex:action.data.pageIndex,
                item:action.data.coverList
            }
        default :
            return state
    }
}



