import { GETBANNERLIST ,GETCOVERLIST } from './constants'
import { getbanner ,getcover } from '@api/home'

// 获取banner

// 异步
export const getbannerlist = () => {
    return (dispatch) => {
        return getbanner().then(response => {
            dispatch(bannersuccess(response));
            return response
        });
    };
}

// 同步
const bannersuccess = data => ({
    type: GETBANNERLIST,
    data,
})


// 获取视频封面数据

// 异步
export const getcoverlist = (pageIndex)=>{
    return (dispatch)=>{
        return getcover(pageIndex).then(response=>{
            dispatch(coversuccess(response))
        })
    }
}
const coversuccess = data => ({
    type: GETCOVERLIST,
    data,
})