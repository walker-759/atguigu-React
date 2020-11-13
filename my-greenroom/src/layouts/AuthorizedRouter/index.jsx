import React, { Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'

// 路由懒加载
const Home = lazy(() => import('@pages/Home'))
const Htusers = lazy(() => import('@pages/Htusers'))
const Video = lazy(() => import('@pages/Resource/Video'))
const Comments = lazy(() => import('@pages/Resource/Comments'))
const Frontuser = lazy(() => import('@pages/Frontuser'))
// 添加后台用户
const Addhtuser = lazy(() => import('@pages/Htusers/components/Addhtuser'))
// 查看视频详情
const Showvideo = lazy(() => import('@pages/Resource/Video/components/Showvideo'))
// 添加视频
const AddVideo = lazy(() => import('@pages/Resource/Video/components/AddVideo'))

class AuthorizedRouter extends React.Component {
    state = {
    }
    render() {
        return (
            <>
                <Suspense fallback={<h1>正在加载</h1>}>
                    <Route path="/" component={Home} exact />
                    <Route path="/user/htuser" component={Htusers} />
                    <Route path="/user/frontuser" component={Frontuser} />
                    <Route path="/res/video" component={Video} />
                    <Route path="/res/comments" component={Comments} />
                    <Route path="/user/addhtuser" component={Addhtuser} />
                    <Route path="/res/showvideo" component={Showvideo} />
                    <Route path="/res/addvideo" component={AddVideo} />
                </Suspense>

            </>
        )
    }
}
export default AuthorizedRouter