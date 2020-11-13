import React from 'react'
import TopBar from '@com/TopBar/TopBar'
import RegisterContent from '@com/RegisterContent'
import WithForme from '@com/HOC'
import './css/index.less'
const Wregister = WithForme(RegisterContent)


class Register extends React.Component {
    state = {
    }
    render() {
        return (
            <>
                <TopBar title="注册" nav="/login" />
                {/* <RegisterContent /> */}
                <Wregister />
                {/* <div className="loginWrap">
                    <form className="form">
                        <div className="inputblock">
                            <span className="fone icon icon-shouji iconfont "></span>
                            <input type="text" placeholder="请输入账号"  />
                        </div>
                        <div className="inputblock">
                            <span className="pass icon icon-yanzhengma iconfont "></span> */}
                            {/* <span className="yanzheng">获取验证码</span> */}
                            {/* <input type="password" placeholder="请输入昵称"  /> */}
                        {/* </div>
                        <div className="inputblock">
                            <span className="pass icon icon-mima iconfont "></span>
                            <input type="password" placeholder="请输入密码"  />
                        </div>
                        <div className="inputblock">
                            <span className="pass icon icon-mima iconfont "></span>
                            <input type="password" placeholder="再次输入密码"  />
                        </div>
                        
                        <button className="btn" type="button">注册</button>
                    </form>
                </div> */}
            </>
        )
    }
}
export default Register