import React,{Suspense,lazy} from 'react'
import {Redirect,Route} from 'react-router-dom'
// 公共布局组件,把login组件拿过来
const Login =lazy(()=>import('@pages/Login'))
class PublicLayout extends React.Component {
    state = {
    }
    render() {
        return (
            // 懒加载需要使用这个Suspense组件
            <Suspense fallback={<h1>正在加载</h1>}>
                <Route path='/login' component={Login} exact />
                {/* 没登录,输入什么网址,都重定向到登陆的地址 */}
                <Redirect to='/login'></Redirect>
            </Suspense>
        )
    }
}
export default PublicLayout