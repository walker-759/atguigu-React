import React from 'react'
// 主题布局组件(登录之后)
import PrimaryLayout from './PrimaryLayout'
// 公共布局组件(未登录等组件)
import PublicLayout from './PublicLayout'
// 使用状态数据
import {connect} from 'react-redux'
@connect(state=>({logindata:state.logindata}))
class BasicLayout extends React.Component {
    state = {
    }
    render() {
        const {logindata}=this.props
        // console.log(logindata);
        // 这里后期判断redux中的数据判断有没有登录,登录就去登录后组件
        if(logindata.token){
            return <PrimaryLayout />
        }
        return <PublicLayout />
    }
}
export default BasicLayout