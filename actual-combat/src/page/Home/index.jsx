import React from 'react'
import './css/test.less'
import { Button } from 'antd-mobile'
import { Carousel, WingBlank } from 'antd-mobile';
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
// action  获取banner列表和视频封面列表
import { getbannerlist, getcoverlist } from './redux'
import request from '@uti/request'
// 主页使用redux中的home状态数据
@connect(state => ({ home: state.home }), { getbannerlist, getcoverlist })
class Home extends React.Component {
    state = {
        imgHeight: 176,
        // 底部的加载按钮是否显示标志
        flagemore: true
    }
    async componentDidMount() {
        // console.log(this.props);
        // 页面挂在完毕,判断是不是第一次进入网页,依据是状态数据里面的banner等数据,如果有,就没必要在发请求了
        if (this.props.home.bannerlist.length === 0) {
            // console.log(1);
            // 发redux中的请求
            Toast.success('加载成功 !!!', 1);
            // 发请求把banner存在redux中
            this.props.getbannerlist()
            // 发请求把视频封面信息存在redux中
            this.props.getcoverlist(1)
        }
    }
    // 获取更多视频封面数据
    getmorevideos = () => {
        if (this.props.home.cover.pageIndex + 1 > this.props.home.cover.pageSum) {
            Toast.offline('没有更多数据啦 !!!', 1);
            this.setState({
                flagemore: false
            })
            return
        }
        Toast.success('加载成功 !!!', 1);
        this.props.getcoverlist(this.props.home.cover.pageIndex + 1)
    }
    // 点击跳转至视频播放页面
    gotovideo = (id) => async () => {
        this.props.history.push('/video', { id })
        // 发请求,增加播放量
        const result = await request({
            url:'/coverlist',
            method: 'PUT',
            data:{
                id
            }
        })
        // console.log(result);
    }
    render() {
        return (
            <>
                <div className="homewrap">
                    <div className="banner">
                        <WingBlank className="WingBlank">
                            <Carousel
                                autoplay={false}
                                infinite
                                dotStyle={{ width: '10px', height: '10px', background: '#eaeaea' }}
                                dotActiveStyle={{ width: '10px', height: '10px', background: '#35d4ff' }}
                            >
                                {this.props.home.bannerlist.map((val) => {
                                    return (
                                        <img src={val.bannerUrl}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top' }}
                                            key={val.id} />
                                    )
                                })}
                            </Carousel>
                        </WingBlank>
                    </div>
                    <div className="content">
                        <div className="hint">
                            <p>系统推荐</p>
                        </div>
                        <div className="video">
                            {
                                this.props.home.cover.coverList.map((item) => {
                                    return (
                                        <div className="videoItem" onClick={this.gotovideo(item.id)} key={item._id}>
                                            <div className="imageblock">
                                                <img src={item.videoCover} alt="" />
                                                <div className="time">{item.videoLength}</div>
                                            </div>

                                            <div className="text"><span>{item.videoName}</span><span className="right">播放量&nbsp;:&nbsp;&nbsp;{item.amount}</span></div>

                                        </div>
                                        // 
                                    )
                                })
                            }
                            {this.state.flagemore ? <Button className="btn" type="primary" onClick={this.getmorevideos}>获取更多</Button> : <></>}
                        </div>

                    </div>
                </div>
            </>
        )
    }
}
export default Home