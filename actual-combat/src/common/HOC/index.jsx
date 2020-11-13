import React from 'react'
function WithForme(ComponentItem) {
    class HOC extends React.Component {
        state = {
            useRaccount: '',
            nickName: '',
            passWord:'',
            repassword: ''
        }
        // 高阶组件收集登录和注册的数据
        handlechange = name => {
            return e => {
                this.setState({
                    [name]: e.target.value
                })
            }
        }
        render() {
            return (
                <>
                    <ComponentItem {...this.state} handlechange={this.handlechange} />
                </>
            )
        }
    }
    return HOC
}
export default WithForme