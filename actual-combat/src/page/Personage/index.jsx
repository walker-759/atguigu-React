import React from 'react'
import './css/index.less'
import bj from './image/bj.png'
import popularize from './image/我要推广.png'
import collect from './image/我的收藏.png'
import more from './image/更多符号-粉色.png'
class Active extends React.Component {
    state = {
        // 昵称
        nickName: ''
    }
    // 
    componentDidMount() {
        let nickName = ''
        // 如果缓存中有token等,设置昵称为缓存中的昵称
        if (localStorage.getItem("userInfo")) {
            nickName = JSON.parse(localStorage.getItem("userInfo")).nickName
        } else {
            nickName = null
        }
        this.setState({
            nickName: nickName
        })
    }
    // 去登录
    handlelogin = () => {
        // console.log(this.props);
        this.props.history.push('/login')
    }
    // 去收藏
    gotoCollect = () => {
        this.props.history.push('/collect')
    }
    // 去设置
    gotoseeting=()=>{
        this.props.history.replace('/seeting')
    }
    render() {
        return (
            <>
                <div className="wrap">
                    <div className="header">
                        <div className="image">
                            <img src={bj} alt="" />
                        </div>
                        <div className="seting iconfont icon-shezhi" onClick={this.gotoseeting}></div>
                        {
                            !this.state.nickName ?
                                <div className="login" onClick={this.handlelogin}>
                                    <div className="iconfont icon-denglu"></div>
                                    <div className="text">陛下,您还没有登录,登录后即可观看更多影片</div>
                                </div> :
                                <div className="loginSuccess">
                                    {/* <img src="" alt=""/> */}
                                    <div className="username">{this.state.nickName}</div>
                                </div>
                        }
                        <div className="computed">
                            <div className="videoNum">
                                <div className="num">1/3</div>
                                <div className="text">当前可观看影片次数</div>
                            </div>
                            <div className="personNum">
                                <div className="num">1/3</div>
                                <div className="text">当前推广人数</div>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <div className="popularize contentItem">
                            <img className='imageLeft' src={popularize} alt="" />
                            <div>我要推广</div>
                            <img className="imgrigtt" src={more} alt="" />
                        </div>
                        <div className="collect contentItem" onClick={this.gotoCollect}>
                            <img className='imageLeft' src={collect} alt="" />
                            <div>我的收藏</div>
                            <img className="imgrigtt" src={more} alt="" />
                        </div>
                        {/* <span className="iconfont icon-wode"></span> */}
                    </div>
                </div>

            </>
        )
    }
}
export default Active