import React from 'react'
import PrimaryLayout from './PrimaryLayout'
// 二级路由组件
import Second from './Second'
// 非路由组件拿到history
import {withRouter} from 'react-router-dom'
// 二级路由配置文件,就是导航栏包括那些路径时候,渲染二级页面
import {secondlist} from './Secondlist.js'
@withRouter
class layouts extends React.Component {
    state = {
    }
    render() {
        // 拿到当前浏览器地址栏路径
        let path=this.props.location.pathname
        // 用正则拿出来
        const namearr = path.match(/[/][a-z]*/g)[0]
        // 与二级页面配置文件匹配,匹配到了就渲染二级页面路由组件(其实就是不渲染底部导航栏)
        const result=secondlist.includes(namearr)
        if(result){
            return(<Second></Second>)
        }
        return (
                //正常就是渲染主体的一级路由 
                <PrimaryLayout></PrimaryLayout>
        )
    }
}
export default layouts

