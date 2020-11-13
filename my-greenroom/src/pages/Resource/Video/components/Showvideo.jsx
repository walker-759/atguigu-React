import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons' //导入antd中的icon
import Player from 'griffith'
import { getvideo } from '@api/video'
import './css/show.less'
class Showvideo extends React.Component {
    state = {
        video: {}
    }
    async componentDidMount() {
        const result = await getvideo(this.props.location.state.id)
        this.setState({
            video: result.video
        })
    }
    render() {
        const { video } = this.state
        const elseVideos = video.elseVideos
        const sources = {
            hd: {
                play_url: this.state.video.videoUrl,
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
                <Card title={
                    <>
                        <Link to="/res/video">
                            <ArrowLeftOutlined />
                        </Link>
                        <span>视频详情</span>
                    </>
                } >
                    <div className="showblock">
                        <div className="videoID showItem">
                            <span className="title">视频ID</span>
                            <span>{video.id}</span>
                        </div>
                        <div className="name showItem">
                            <span className="title">视频名称</span>
                            <span>{video.videoName}</span>
                        </div>
                        <div className="time showItem">
                            <span className="title">时长</span>
                            <span>{video.videoLength}</span>
                        </div>
                        <div className="cover showItem">
                            <span className="title">视频封面</span>
                            <span><img src={video.videoCover} alt="" /></span>
                        </div>
                        <div className="elseVideos showItem">
                            <span className="title">相关推荐</span>
                            <div className="elseVideosItem">
                                {elseVideos?elseVideos.map((item) => {
                                    return (
                                        <div className="contant" key={item.id}>
                                            <img src={item.videoCover} alt="" />
                                            <div className="xinxi">
                                                <span className="title">视频名称</span>
                                                <span>{item.videoName}</span>
                                            </div>
                                            <div className="xinxi">
                                                <span className="title">视频id</span>
                                                <span>{item.id}</span>
                                            </div>
                                            <div className="xinxi">
                                                <span className="title">播放量</span>
                                                <span>{item.amount}</span>
                                            </div>
                                            <div className="xinxi">
                                                <span className="title">时长</span>
                                                <span>{item.videoLength}</span>
                                            </div>
                                        </div>
                                    )
                                }):''}
                            </div>
                        </div>
                        <div className="videourl showItem">
                            <span className="title">视频预览</span>
                            <span className="video">
                                {this.state.video.videoCover?<Player
                                    title="测试视频"
                                    sources={sources}
                                    id={'1'}
                                    cover={video.videoCover}
                                    duration={1000}
                                ></Player>:''}
                            </span>
                        </div>
                    </div>
                </Card>
            </>
        )
    }
}
export default Showvideo