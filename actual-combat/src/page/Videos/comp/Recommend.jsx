import React from 'react'
// 获取推荐视频action,修改视频播放地址action,初始化action
import {getvideodata,updateurl,init} from '../redux/actions'
import {connect} from 'react-redux'
@connect(null,{getvideodata,updateurl,init})
class Recommend extends React.Component {
    state = {
    }
    // 点击推荐看发请求更新数据看其他的视频
    gotovideo = (id) => () => {
        // 切换视频之前,先发一个同步的action 把redux 中的视频url制空一下,不然视频那块还会用之前的url地址,导致切换不了
        // 视频,原因是视频包底层实现的问题
        // this.props.updateurl() 
        // 现在直接掉init,直接把redux清空了就行了
        this.props.init() 
        // 发请求拿新的视频详细信息
        this.props.getvideodata(id)
    }
    render() {
        return (
            <div className="recommendBlock">
                <div className="title">推荐</div>
                <div className="recommendList">
                    {
                        // 数据是上级组件传过来的
                        this.props.elseVideos.map((item) => {
                            return (
                                <div className="recommendItem" key={item.id} onClick={this.gotovideo(item.id)}>
                                    <img src={item.videoCover} alt="" />
                                    <div className="brief">
                                        <div className="videoname">{item.videoName}</div>
                                        <div className="time">时长:{item.videoLength}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <Button className="moreVideo" type="primary">换一批</Button> */}
                </div>
            </div>
        )
    }
}
export default Recommend