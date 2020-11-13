import {GETCOVERLIST} from './constants'
import {getcoverlist} from '@api/video'

export const getcover = (pageIndex)=>{
    return dispatch=>{
        return getcoverlist(pageIndex).then(res=>{
            dispatch(getcoversuccess(res))
            return res
        })
    }
}
const getcoversuccess = (data)=>{
    return {
        type:GETCOVERLIST,
        data
    }
}