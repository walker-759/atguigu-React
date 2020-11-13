import React from 'react'
import request from '@uti/request'
import { withRouter } from 'react-router-dom'
import { ImagePicker, WingBlank,Toast } from 'antd-mobile'
@withRouter
class RegisterContent extends React.Component {
    state = {
        // 收集图片数据
        files: [],
    }
    componentDidMount() {
        // console.log(this.props);
    }
    reg = async () => {
        // 拿到账号,密码,昵称,做简单的表单验证
        const { nickName, passWord, useRaccount,repassword } = this.props
        if(nickName==='' || passWord==='' || useRaccount==='' || repassword==='' || this.state.files.length===0){
            Toast.offline('所有内容必填',1)
            return
        }
        // 判断用户头像是否过大
        if(this.state.files[0].file.size/1024>100){
            Toast.offline('图片太大了',1)
            return
        }
        // 发请求
        const result = await request({
            url: '/reg',
            method: 'POST',
            data: {
                nickName,
                passWord,
                useRaccount,
                userhead:this.state.files[0].url
            }
        })
        // 判断登录是否成功
        // console.log(result);
        if (result.ok === 1) {
            this.props.history.push('/login')
        } else if (result.ok === -1) {
            alert(result.msg)
        }
    }
    // 收集图片信息是否正确
    onChange = (files, type, index) => {
        // console.log(files, type, index);
        // console.log(files[0].url);
        this.setState({
            files,
        });
    }
    render() {
        return (
            <>
                <div className="loginWrap">
                    <form className="form">
                        <div className="inputblock">
                            <span className="fone icon icon-shouji iconfont "></span>
                            <input type="text" placeholder="请输入账号" value={this.props.useRaccount} onChange={this.props.handlechange('useRaccount')} />
                        </div>
                        <div className="inputblock">
                            <span className="pass icon icon-yanzhengma iconfont "></span>
                            {/* <span className="yanzheng">获取验证码</span> */}
                            <input type="text" placeholder="请输入昵称" value={this.props.nickname} onChange={this.props.handlechange('nickName')} />
                        </div>
                        <div className="inputblock">
                            <span className="pass icon icon-mima iconfont "></span>
                            <input type="password" placeholder="请输入密码" value={this.props.passWord} onChange={this.props.handlechange('passWord')} />
                        </div>
                        <div className="inputblock">
                            <span className="pass icon icon-mima iconfont "></span>
                            <input type="password" placeholder="再次输入密码" value={this.props.repassword} onChange={this.props.handlechange('repassword')} />
                        </div>
                        <WingBlank>
                            <ImagePicker
                                files={this.state.files}
                                onChange={this.onChange}
                                selectable={this.state.files.length < 1}
                            />
                        </WingBlank>
                        <button className="btn" type="button" onClick={this.reg}>注册</button>
                    </form>

                </div>
            </>
        )
    }
}
export default RegisterContent