import React from 'react'
import TopBar from '@com/TopBar/TopBar'
import './css/index.less'
// 使用高阶组件手机登录和注册的数据
import LoginContent from '@com/LoginContent'
import WithForme from '@com/HOC'
const Wregister = WithForme(LoginContent)
class Login extends React.Component {
    state = {
    }
    render() {
        return (
            <>
                <TopBar title="登录" nav="/personage" />
                <Wregister />
                {/* <div className="loginWrap">
                    <img className="logo" src={logo} alt="" />
                    <form className="form">
                        <div className="inputblock">
                            <span className="fone icon icon-shouji iconfont "></span>
                            <input type="text" placeholder="请输入手机号"  />
                        </div>
                        <div className="inputblock">
                            <span className="pass icon icon-mima iconfont "></span>
                            <input type="password" placeholder="请输入密码"  />
                        </div>
                        
                        <button className="btn" type="button">登录</button>
                        <div className="operation">
                            <span onClick={this.gotoregister}>注册账号</span>
                            <span>忘记密码</span>
                        </div>
                    </form>
                    
                </div> */}
            </>
        )
    }
}
export default Login