import React from 'react'
// link标签
import { NavLink } from 'react-router-dom'
// 容器组件
import {connect} from 'react-redux'
// action,测试用的,不用管
import {entertoroute} from './redux/index'
import './css/index.less'
@connect(state=>({menustatus:state.menustatus}),{entertoroute})
class Menu extends React.Component {
    state = {
    }
    
    render() {
        
        return (
            <div className="menuBlock">
                <NavLink to='/' activeClassName="ac" exact>
                    <div className="iconfont icon-daohangshouye"></div>
                    <div>首页</div>
                </NavLink>
                <NavLink to='/community' activeClassName="ac">
                    <div className="iconfont icon-shequ-active"></div>
                    <div>社区</div>
                </NavLink>
                <NavLink to='/personage' activeClassName="ac">
                    <div className="iconfont icon-wode"></div>
                    <div>个人中心</div>
                </NavLink>
                {/* <NavLink to='/mine' activeClassName="ac">
                    <div></div>
                    <div>我的</div>
                </NavLink> */}
            </div>
        )
    }
}
export default Menu