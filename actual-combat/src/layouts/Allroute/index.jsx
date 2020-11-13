import React from 'react'
import { Route } from 'react-router-dom'
// 三个主要页面组件,首页,社区,个人中心
import Home from '@page/Home'
import Community from '@page/Community'
import Personage from '@page/Personage'
// import Mine from '@page/Mine/index'
class Allroute extends React.Component {
    state = {
    }
    render() {
        return (
            <>
                <Route path='/' component={Home} exact></Route>
                <Route path='/community' component={Community}></Route>
                <Route path='/personage' component={Personage}></Route>
                {/* <Route path='/personage1/mine' component={Mine}></Route> */}
            </>
        )
    }
}
export default Allroute