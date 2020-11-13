import { GETVIDEO, UPDATEURL, GETCOMMENTS ,INIT} from './contants'
import { getvideo, getcomments } from '@api/video'

// 获取视频同步

const getvideoscuuess = (data) => {
    return {
        type: GETVIDEO,
        data,
    }
}

// 获取视频异步
export const getvideodata = (id) => {
    return dispatch => {
        return getvideo(id).then(response => {
            dispatch(getvideoscuuess(response))
            return response
        })
    }
}

// 获取评论信息异步
export const getcommentsdata = (pageIndex, videoId) => {
    return dispatch => {
        return getcomments(pageIndex, videoId).then(response => {
            dispatch(getcommentsuccess(response))
        })
    }
}

// 获取评论信息同步

const getcommentsuccess = (data) => {
    return {
        type: GETCOMMENTS,
        data
    }
}








// 修改视频url的同步action
export const updateurl = () => {
    return dispatch => {
        dispatch({
            type: UPDATEURL,
            data: ''
        })
    }
}

// 初始化redux同步action
export const init =()=>{
    return dispatch=>{
        dispatch({
            type:INIT
        })
    }
}