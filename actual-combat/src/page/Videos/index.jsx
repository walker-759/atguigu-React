import React from 'react'
// 二级页面统一使用顶部标题组件
import TopBar from '@com/TopBar/TopBar'
// 视频播放插件
import Player from 'griffith'
import './css/index.less'
import {connect} from 'react-redux'
// 获取视频详细数据和初始化的action
import {getvideodata,init} from './redux/actions'
// 推荐组件
import Recommend from './comp/Recommend'
// 评论组件
import Comment from './comp/Comment'
@connect(state=>({video:state.video}),{getvideodata,init})
class Videos extends React.Component {
    state = {
        // 当前页面下面显示推荐还是评论的标识
        flage: 0
    }
    // 加载完毕 发请求
    async componentDidMount() {
        // 拿到路由跳转传过来的参数  就是影片的映射id
        const id = this.props.location.state.id
        await this.props.getvideodata(id)
        // console.log(this.props);
    }
    
    // 评论和推荐条件渲染
    status = () => {
        if (this.state.flage === 0) {
            return <Recommend elseVideos={this.props.video.videodata.elseVideos} />
        }
        if (this.state.flage === 1) {
            
            return <Comment />
        }
    }
    // 点击推荐或者评论,切换显示与隐藏
    changestatus = (id) => () => {
        this.setState({
            flage: id
        })
    }
    // video组件卸载,清空redux的数据,就是初始化
    componentWillUnmount(){
        this.props.init()
    }
    render() {
        // console.log(this.props.video.videodata);
        // 视频数据的配置
        const sources = {
            hd: {
                // 视频播放地址直接从redux中获取
                play_url: this.props.video.videodata.videoUrl,
                bitrate: 1,
                duration: 1000,
                format: '',
                height: 380,
                width: 750,
                size: 160000
            }
        }
        return (
            <>
                <TopBar title="视频播放" nav="/" />
                <div className="videoWrap">
                    <div className="videoBlock">
                        {/* 千万要注意griffith这个播放器一定要有数据回来了在去渲染,不然拿不到播放地址会报错 */}
                        {this.props.video.videodata.videoUrl && <Player
                            title="测试视频"
                            sources={sources}
                            id={'1'}
                            cover={this.props.video.videodata.videoCover}
                            duration={1000}
                        ></Player>}

                    </div>
                    {
                        <div className="videoState1">
                            <div className="brief">
                                <div className="top">
                                    <div className="videoname">{this.props.video.videodata.videoName}</div>
                                    <div className="operation">
                                        <span>简介</span>
                                        <span className="iconfont icon-gengduo"></span>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <span onClick={this.changestatus(1)} className="iconfont icon-pinglun" style={{ color: this.state.flage === 1 ? '#78ac77' : '#000' }}></span>
                                    <span className="iconfont icon-icon"></span>
                                    <span onClick={this.changestatus(0)} className="iconfont icon-share_icon" style={{ color: this.state.flage === 0 ? '#78ac77' : '#000' }}></span>
                                </div>
                            </div>
                            {
                                this.status()
                            }
                        </div>

                    }
                </div>

            </>
        )
    }
}
export default Videos