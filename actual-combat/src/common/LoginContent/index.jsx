import React from 'react'
import logo from './img/logo2.png'
// 非路由组件拿到history
import { withRouter } from 'react-router-dom'
import request from '@uti/request'
import { Toast } from 'antd-mobile'
@withRouter

class LoginContent extends React.Component {
    state = {
    }
    componentDidMount() {
        // console.log(this.props);
    }
    // 去注册
    gotoregister = () => {
        this.props.history.replace('/register')
    }
    loadingToast = () => {
        
    }
    // 点击登录发请求
    login = async () => {
        
        // 拿到账号密码
        const { useRaccount, passWord } = this.props
        // 发请求
        const result = await request({
            url: '/login',
            method: 'POST',
            data: {
                useRaccount,
                passWord
            }
        })
        if (result.ok === 1) {
            const userInfo = JSON.stringify({ userToken: result.token, nickName: result.nickName })
            localStorage.setItem("userInfo", userInfo)
            Toast.success('登录成功啦!!!', 1)
            // alert('登录成功')
            this.props.history.replace('/personage')
        } else {
            // alert('登录失败')
            Toast.offline('登录失败')
        }
        // console.log(result);
    }
    render() {
        return (
            <>
                <div className="loginWrap">
                    <img className="logo" src={logo} alt="" />
                    <form className="form">
                        <div className="inputblock">
                            <span className="fone icon icon-shouji iconfont "></span>
                            <input type="text" placeholder="请输入账号" value={this.props.useRaccount} onChange={this.props.handlechange('useRaccount')} />
                        </div>
                        <div className="inputblock">
                            <span className="pass icon icon-mima iconfont "></span>
                            <input type="password" placeholder="请输入密码" value={this.props.passWord} onChange={this.props.handlechange('passWord')} />
                        </div>

                        <button className="btn" type="button" onClick={this.login}>登录</button>
                        <div className="operation">
                            <span onClick={this.gotoregister}>注册账号</span>
                            <span>忘记密码</span>
                        </div>
                    </form>

                </div>
            </>
        )
    }
}
export default LoginContent