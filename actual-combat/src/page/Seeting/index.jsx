import React from 'react'
import TopBar from '@com/TopBar/TopBar'
import { List, Switch, Button } from 'antd-mobile';
import './css/index.less'
class App extends React.Component {
    state = {
        checked: false,
        checked1: false,
    }
    gotoperso=()=>{
        localStorage.removeItem('userInfo')
        this.props.history.replace('/personage')
    }
    render() {
        return (
            <>
                <TopBar title="设置" nav="/personage" />
                <div className="setwrap">
                    <List className="lis">
                        <List.Item
                            extra={<Switch
                                checked={this.state.checked}
                                onChange={() => {
                                    this.setState({
                                        checked: !this.state.checked,
                                    });
                                }}
                            />}
                        >自动播放</List.Item>
                    </List>
                    <List className="lis">
                        <List.Item
                            extra={<Switch
                                checked={this.state.checked1}
                                onChange={() => {
                                    this.setState({
                                        checked1: !this.state.checked1,
                                    });
                                }}
                            />}
                        >自动登录</List.Item>
                    </List>
                    <Button className="btn" type="primary" onClick={this.gotoperso}>退出登录</Button>
                </div>

            </>
        )
    }
}
export default App