import React from 'react'
import { Route } from 'react-router-dom'
// 二级页面(不带底部导航栏的)
// 登录,注册,视频,设置,收藏,目前就这些
import Login from '@page/Login'
import Videos from '../../page/Videos'
import Collect from '../../page/Collect'
import Register from '../../page/Register'
import Seeting from '../../page/Seeting'

class Second extends React.Component {
    state = {
    }
    render() {
        return (
            <>
                <Route path='/login' component={Login}></Route>
                <Route path='/video' component={Videos}></Route>
                <Route path='/collect' component={Collect}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/seeting' component={Seeting}></Route>
                
            </>
        )
    }
}
export default Second