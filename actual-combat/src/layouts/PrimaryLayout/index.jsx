import React from 'react'
// 底部导航
import Menu from '../Menu'
// 所有的一级路由组件
import Allroute from '../Allroute'
import './css/index.less'
class PrimaryLayout extends React.Component {
    state = {
        a:1
    }
    render() {
        return (
            <>
                {/* 这个状态数据目前来看好像没什么用 */}
                {this.state.a?<div className="menu">
                    {/* 四个菜单  link */}
                    <Menu />
                </div>:''}
                <div className="allroute">
                    {/* 所有路由组件 */}
                    <Allroute></Allroute>
                </div>

            </>

        )
    }
}
export default PrimaryLayout