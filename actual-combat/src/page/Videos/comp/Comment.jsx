import React from 'react'
import { List, TextareaItem } from 'antd-mobile';
import { ImagePicker, WingBlank, Button } from 'antd-mobile';
// 时间包
import moment from 'moment'
import { Toast } from 'antd-mobile'
// import request from '@uti/request'
import { connect } from 'react-redux'
// 获取评论分页数据函数
import { getcommentsdata } from '../redux/index'
// 添加评论信息函数
import { addcomments } from '@api/video'
// 非路由组件拿到history
import {withRouter} from 'react-router-dom'
@withRouter
@connect(state => ({ video: state.video }), { getcommentsdata })
class Comment extends React.Component {
    state = {
        // 添加的图片信息数组
        files: [],
        // 底部获取更多按钮标识
        flagemore: false,
        // 评论信息
        comments: ''
    }
    // 评论组件挂在完毕,发请求拿评论数据
    // 存在问题,每次进来都要重新发请求那评论数据
    // 解决方案,video卸载,状态数据制空
    componentDidMount() {
        // 如果redux中的数据长度小于1,就发请求拿数据,否则证明反复加载次组件,不用发请求拿数据
        // video卸载清空redux
        if (this.props.video.comments.commentsList.length < 1) {
            this.getcomments()
        }

    }
    // 评论请求函数
    getcomments = async (pageIndex = 1) => {
        const videoId = this.props.video.videodata.videoId
        await this.props.getcommentsdata(pageIndex, videoId)
        console.log(this.props);
        Toast.success('加载成功 !!!', 1);
    }
    //点击获取更多的评论(涵分页逻辑) 
    getmorecomments = async () => {
        if (this.props.video.comments.pageIndex + 1 > this.props.video.comments.pageSum) {
            Toast.offline('没有更多数据啦 !!!', 1);
            this.setState({
                flagemore: true
            })
            return
        }
        this.getcomments(this.props.video.comments.pageIndex + 1)
    }
    // 收集评论信息存在状态数据里面
    commentChange = (e) => {
        // console.log(e);
        this.setState({
            comments: e
        })
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
                // 如果有一个图片超标了,那么就是图片过大
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
        // console.log(filarr);
        // 发请求添加评论信息,要验证token的
        const result = await addcomments({
            comments: this.state.comments,
            videoId: this.props.video.videodata.videoId,
            commentsImgArr: filarr
        })
        // 拿到添加结果
        if (result.ok === 1) {
            Toast.success('添加成功')
            this.setState({
                comments: '',
                files: []
            })
            this.getcomments(1)
        } else {
            // token过期去登录
            Toast.offline('登录过期,请重新登录 !!!', 1);
            localStorage.removeItem('userInfo')
            // 去登录页面
            this.gotologin()
        }
    }
    // 添加图片,把图片存在状态数据中
    onChange = (files, type, index) => {
        // console.log(files, type, index);
        // console.log(files[0].url);
        this.setState({
            files,
        });
    }

    // 因token过期要跳转到login页面的函数
    gotologin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const { files } = this.state;
        return (
            <div className="commentsList">
                <List renderHeader={() => '精彩评论'}>
                    <TextareaItem
                        placeholder="请输入您的精彩评论"
                        rows={5}
                        count={100}
                        onChange={this.commentChange}
                        value={this.state.comments}
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
                        this.props.video.comments.commentsList.map((item, index) => {
                            return (
                                <div className="commentsItem" key={item._id + index}>
                                    <div className="top">
                                        <div className="userheadBlock">
                                            <img className="userhead" src={item.userhead ? item.userhead : ''} alt="" />
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
                    {/* 判断首先要有评论,而且标志位还不能为空 */}
                    {this.props.video.comments.commentsList.length ?
                        this.state.flagemore ?
                            ''
                            : <Button type="primary" onClick={this.getmorecomments}>获取更多</Button>
                        : ''}
                </div>
            </div>
        )
        // return <div>评论测试</div>
    }
}
export default Comment