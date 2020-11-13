import { GETVIDEO, UPDATEURL, GETCOMMENTS,INIT } from './contants'
const videoinit = {
    videodata: {
        elseVideos: [],
        videoCover: '',
        videoLength: '',
        videoName: '',
        videoUrl: '',
        videoId: ''
    },
    comments: {
        pageIndex: '',
        commentsList: [],
        pageSum: ''
    }
}

export function video(state = videoinit, action) {
    switch (action.type) {
        case GETVIDEO:
            const { elseVideos, videoCover, videoLength, videoName, videoUrl } = action.data.video
            const videoId = action.data.video.id
            return {
                videodata: {
                    elseVideos, videoCover, videoLength, videoName, videoUrl, videoId
                },
                comments:{
                    ...state.comments
                }
                
            }
        case UPDATEURL:
            let result = { ...state }
            result.videodata.videoUrl = ''
            return result

        case GETCOMMENTS :
            const {commentsList,pageIndex,pageSum} = action.data
            // const videodata = state.videodata
            if(pageIndex===1){
                return {
                    videodata:{...state.videodata},
                    comments:{
                        commentsList:[...commentsList],
                        pageIndex,
                        pageSum
                    }
                }
            }
            return {
                videodata:{...state.videodata},
                comments:{
                    commentsList:[...state.comments.commentsList,...commentsList],
                    pageIndex,
                    pageSum
                }
            }
        case INIT:
            return videoinit
        default:
            return state
    }
}