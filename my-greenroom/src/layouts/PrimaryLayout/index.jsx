import React from 'react'
// 登录之后主体组件
import { Layout, Breadcrumb ,Button,message} from 'antd';
import {
    GlobalOutlined
} from '@ant-design/icons';
import './css/index.less'
import logo from '../../assets/image/logo4.png'
// 引入所有导航菜单组件
import SiderMenu from '../Menu/index'
// 引入所有路由组件
import AuthorizedRouter from '../AuthorizedRouter'
// 不是路由组件,拿到history
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
// 退出登录action
import {logout} from '../../redux/actions/action'
const { Header, Content, Footer, Sider } = Layout;
@connect(state=>({logindata:state.logindata}),{logout})
@withRouter
class PrimaryLayout extends React.Component {
    state = {
        collapsed: false,
    };

    // antd菜单收起
    onCollapse = collapsed => {
        // console.log(collapsed);
        this.setState({ collapsed });
    };
    // 退出登录
    logout=()=>{
        localStorage.removeItem('HTusertoken')
        this.props.logout()
        message.success('退出成功')
        
    }
    render() {
        // 通过从地址栏拿地址,来判断路径导航这块应该渲染什么东西(此处逻辑有些问题,后面在仔细搞一下)
        const permissionList = [
            { name: '用户管理', path: '/user' ,children: [{ name: '后台用户管理', path: '/htuser' }, { name: '客户端用户管理', path: '/frontuser' }]},
            { name: '资源管理', path: '/res', children: [{ name: '视频管理', path: '/video' }, { name: '评论管理', path: '/comments' }] },
        ]
        const path = this.props.location.pathname
        const namearr = path.match(/[/][a-z]*/g)
        let fname = namearr[0]
        let tname = namearr[1]
        // let thname = namearr[3]
        let title1
        let title2
        permissionList.forEach(item => {
            if (fname === item.path) {
                title1 = item.name
            }
            if (item.children) {
                item.children.forEach((item1) => {
                    if (tname === item1.path) {
                        title2 = item1.name
                    }
                })
            }
        });

        return (
            // 布局
            <Layout className="layout"  >
                {/* 左侧菜单 */}
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}>
                    <div className='logo'>
                        <img src={logo} alt='' />
                        {!this.state.collapsed && <h1>PP视频管理系统</h1>}
                    </div>
                    {/* 所有导航组件 */}
                    <SiderMenu />
                </Sider>
                <Layout className="site-layout">
                    <Header className="layout-header"  >
                        <img src={logo} alt='' />
                        <span>{this.props.logindata.userName}</span>
                        <GlobalOutlined />
                        <Button type="link" onClick={this.logout}>退出登录</Button>
                    </Header>
                    <Content >
                        <div className='layout-nav'>
                            <Breadcrumb>
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>{title1 ? title1 : ''}</Breadcrumb.Item>
                                <Breadcrumb.Item>{title2 ? title2 : ''}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="layout-content" >
                            {/* 所有路由组件在这个渲染 */}
                            <AuthorizedRouter />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}
export default PrimaryLayout