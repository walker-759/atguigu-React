import React from 'react'
import { Menu } from 'antd'
import {Link,withRouter} from 'react-router-dom'
import {
    PieChartOutlined,
    TeamOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu
@withRouter
class SiderMenu extends React.Component {
    state = {
    }
    render() {
        // 配置默认选中和默认展开的菜单
        let path=this.props.location.pathname
        const firstpath=path.match(/[/][a-z]*/)[0]
        return (
            <>
                <Menu theme="dark" defaultOpenKeys={[firstpath]} defaultSelectedKeys={[path]} mode="inline">
                    <Menu.Item key="/" icon={<PieChartOutlined />}>
                        <Link to="/">后台管理系统</Link>
                    </Menu.Item>
                    {/* <Menu.Item key="/user" icon={<PieChartOutlined />}>
                        <Link to="/user">用户管理</Link>
                    </Menu.Item> */}
                    <SubMenu key="/user" icon={<TeamOutlined />} title="用户管理">
                        <Menu.Item key="/user/htuser"><Link to="/user/htuser">后台用户管理</Link></Menu.Item>
                        <Menu.Item key="/user/frontuser"><Link to="/user/frontuser">客户端用户管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="/res" icon={<TeamOutlined />} title="资源管理">
                        <Menu.Item key="/res/video"><Link to="/res/video">视频管理</Link></Menu.Item>
                        <Menu.Item key="/res/comments"><Link to="/res/comments">评论管理</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </>
        )
    }
}
export default SiderMenu