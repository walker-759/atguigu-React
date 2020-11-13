import React from 'react'
import TopBar from '@com/TopBar/TopBar'
import Player from 'griffith'
import './css/index.less'
// import { Button } from 'antd-mobile'
import { List, TextareaItem } from 'antd-mobile';
import { ImagePicker, WingBlank, Button } from 'antd-mobile';
import request from '@uti/request'
import { Toast } from 'antd-mobile'
import moment from 'moment'
import {connect} from 'react-redux'
import {getvideodata} from './redux/actions'
@connect(state=>({video:state.video}),{getvideodata})
class Videos extends React.Component {
    state = {
        elseVideos: [],
        videoCover: '',
        videoLength: '',
        videoName: '',
        videoUrl: 0,
        videoId: 0,
        sources: 0,
        flage: 0,
        comments: '',
        // files: data,
        files: [],
        multiple: false,
        pageIndex: '',
        commentsList: [],
        pageSume: '',
        flagemore: false
    }
    // 加载完毕 发请求
    async componentDidMount() {
        // 拿到路由跳转传过来的参数  就是影片的映射id
        const id = this.props.location.state.id
        // 发请求
        this.getvideo(id)
        // console.log(this.props);
        await this.props.getvideodata(id)
        console.log(this.props);
    }
    // 请求函数
    getvideo = async (id) => {
        // 发请求拿数据
        const result = await request({
            url: '/video',
            method: 'GET',
            params: {
                id
            }
        })
        const { elseVideos, videoCover, videoLength, videoName, videoUrl } = result.video
        if (result.ok === 1) {
            this.setState({
                elseVideos,
                videoCover,
                videoLength,
                videoName,
                videoUrl,
                videoId: result.video.id
            })
        } else {
            Toast.offline('网络出错啦 !!!', 1);
        }
    }
    // 点击推荐看发请求更新数据看其他的视频
    gotovideo = (id) => () => {
        // 预防视频数据还没请求回来就再次发请求看别的数据
        if (this.state.videoUrl) {
            this.setState({
                videoUrl: 0,
                // 需要把之前的评论信息清空
                commentsList: []
            })
            this.getvideo(id)
        }
    }
    // 收集评论信息存在状态数据里面
    commentChange = (e) => {
        // console.log(e);
        this.setState({
            comments: e
        })
    }
    // 添加图片,把图片存在状态数据中
    onChange = (files, type, index) => {
        // console.log(files, type, index);
        // console.log(files[0].url);
        this.setState({
            files,
        });
    }
    // 添加评论
    addcomments = async () => {
        // 判断评论信息不能为空
        if (!this.state.comments.trim()) {
            Toast.offline('评论信息不能为空', 1)
            return
        }
        // 判断图片大小
        let flage = true
        this.state.files.forEach((item) => {
            if (item.file.size / 1024 > 100) {
                flage = false
            }
        })
        if (!flage) {
            Toast.offline('图片太大了', 1)
            return
        }
        // 如果上述条件都符合,则拿到图片的base64的码  组成一个数据
        const filarr = this.state.files.map((item) => {
            return item.url
        })
        console.log(filarr);

        // 发请求,添加评论
        const result = await request({
            url: '/comments',
            method: 'POST',
            data: {
                comments: this.state.comments,
                videoId: this.state.videoId,
                commentsImgArr: filarr
            }
        })
        // 拿到添加结果
        if (result.ok === 1) {
            Toast.success('添加成功')
            this.setState({
                comments: '',
                files: []
            })
            this.getcomments()
        } else {
            // token过期去登录
            Toast.offline('登录过期,请重新登录 !!!', 1);
            localStorage.removeItem('userInfo')
            this.gotologin()
        }
    }
    // 点击获取评论,或者进入评论状态获取评论
    getcomments = async (pageIndex = 1) => {
        const result = await request({
            url: '/comments',
            method: "GET",
            params: {
                pageIndex,
                videoId: this.state.videoId
            }
        })
        // console.log(result);
        Toast.success('加载成功 !!!', 1);
        this.setState({
            // 这里面目前这样解决   如果pageindex是1,证明第一次进来或者添加评论 ,那么就不拼接
            // 如果pageindex不是1,证明是点击加载更多,所以就可以拼接了,这时候早就跳过第一页3条数据了
            commentsList: pageIndex === 1 ? [...result.commentsList] : [...this.state.commentsList, ...result.commentsList],
            pageIndex: result.pageIndex,
            pageSume: result.pageSum
        })
    }
    //点击获取更多的评论(涵分页逻辑) 
    getmorecomments = async () => {
        if (this.state.pageIndex + 1 > this.state.pageSume) {
            Toast.offline('没有更多数据啦 !!!', 1);
            this.setState({
                flagemore: true
            })
            return
        }
        this.getcomments(this.state.pageIndex + 1)
    }
    // 因token过期要跳转到login页面的函数
    gotologin = () => {
        this.props.history.replace('/login')
    }
    // 评论和推荐条件渲染
    status = () => {
        if (this.state.flage === 0) {
            return (
                <div className="recommendBlock">
                    <div className="title">推荐</div>
                    <div className="recommendList">
                        {
                            this.state.elseVideos.map((item) => {
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
        if (this.state.flage === 1) {
            const { files } = this.state;
            return (
                <div className="commentsList">
                    <List renderHeader={() => '精彩评论'}>
                        <TextareaItem
                            placeholder="111"
                            rows={5}
                            count={100}
                            onChange={this.commentChange}
                        />
                    </List>
                    {/* 图片选择器 */}
                    <WingBlank>
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            selectable={files.length < 3}
                        />
                    </WingBlank>
                    <Button type="primary" onClick={this.addcomments}>提交</Button>
                    <div className="commentsWrap">
                        {
                            this.state.commentsList.map((item, index) => {
                                return (
                                    <div className="commentsItem" key={item._id + index}>
                                        <div className="top">
                                            <div className="userheadBlock">
                                                <img className="userhead" src={item.userhead?item.userhead:''} alt=""/>
                                            </div>
                                            
                                            <span className="name">{item.nickName}</span>
                                            {/* <span className="time">{item.commentTime}</span> */}
                                            <span className="time">{moment(item.commentTime).format('YYYY/MM/DD hh:mm:ss')}</span>
                                        </div>
                                        <div className="text">{item.contents}</div>
                                        <div className="imageBlock">
                                            {
                                                item.commentImg.map((items, index) => {
                                                    return (
                                                        <img className="image" src={items} alt="" key={index + item._id} />
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                )
                            })
                        }
                        {/* {this.state.flagemore?'':<Button type="primary" onClick={this.getmorecomments}>获取更多</Button>} */}
                        {this.state.commentsList.length ?
                            this.state.flagemore ?
                                ''
                                : <Button type="primary" onClick={this.getmorecomments}>获取更多</Button>
                            : ''}
                    </div>
                </div>
            )
        }

    }
    // 点击推荐或者评论,切换显示与隐藏
    changestatus = (id) => () => {
        if (id === 1 && this.state.commentsList.length < 1) {
            console.log('改获取了');
            this.getcomments()
        }
        this.setState({
            flage: id
        })
    }
    render() {
        // 视频数据的配置
        const sources = {
            hd: {
                play_url: this.state.videoUrl,
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
                        {this.state.videoUrl && <Player
                            title="测试视频"
                            sources={sources}
                            id={'1'}
                            cover={this.state.videoCover}
                            duration={1000}
                        ></Player>}

                    </div>
                    {
                        <div className="videoState1">
                            <div className="brief">
                                <div className="top">
                                    <div className="videoname">{this.state.videoName}</div>
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