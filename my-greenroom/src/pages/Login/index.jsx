import React from 'react'
import './css/index.less'
import loginbk from './img/loginbk.png'
import {message} from 'antd'
import {connect} from 'react-redux'
import {ulogin} from '../../redux/actions/action'
@connect(state=>({logindata:state.logindata}),{ulogin})
class Login extends React.Component {
    // 状态数据存用户名和密码
    state = {
        userName:'',
        passWord:''
    }
    // 受控组件
    handlechange=(key)=>(e)=>{
        if(key==='userName'){
            this.setState({
                userName:e.target.value
            })
        }else{
            this.setState({
                passWord:e.target.value
            })
        }
    }
    // 登录逻辑
    login= async ()=>{
        const {userName,passWord} = this.state
        // 简单验证
        if(!userName.trim() || !passWord.trim()){
            message.warning('用户名或者密码不能为空');
            return
        }
        // 发请求 token存redux
        const result = await this.props.ulogin(userName,passWord)
        if(result.ok===-1){
            message.warning('登录失败,请认真填写用户信息')
            return
        }
        message.success('登录成功')
        // console.log(result);
        localStorage.setItem('HTusertoken', JSON.stringify({token:result.token,userName:result.userName}))
        this.props.history.replace('/')
    }
    render() {
        return (
            <div className="login">
                <div className="loginbk">
                    <img src={loginbk} alt=""/>
                </div>
                <div className="loginItem">
                    <div className="title">PP视频后台管理系统</div>
                    <div className="content">
                        <div className="top">
                            <div className="left">
                                用户登录
                            </div>
                            <div className="right">
                                注册
                            </div>
                        </div>
                        <form>
                            <input type="text" placeholder="请输入账号" value={this.state.userName} onChange={this.handlechange('userName')}/>
                            <input type="password" placeholder="请输入密码" value={this.state.passWord} onChange={this.handlechange('passWord')}/>
                            <button type="button" onClick={this.login}>登录</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login