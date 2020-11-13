import React from 'react'
import './css/index.less'
import {withRouter} from 'react-router-dom'
@withRouter
class App extends React.Component {
    state = {
        flage:false
    }
    handleNav=()=>{
        this.props.history.replace(this.props.nav)
    }
    change=()=>{
        // console.log(1);
        this.props.cahngeoperation(!this.state.flage)
        this.setState({
            flage:!this.state.flage
        })
    }
    render() {
        const { title, right } = this.props
        return (
            <>
                <div className="topBar">
                    <div className="left iconfont icon-fanhui" onClick={this.handleNav}></div>
                    <div className="title">{title}</div>
                    <div className="right" onClick={this.change}>{this.state.flage?'取消':right}</div>
                </div>
            </>
        )
    }
}
export default App