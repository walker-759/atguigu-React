import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Form, Button, Input, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons' //导入antd中的icon
import { addhtuser,updateuser } from '@api/htuser'
const layout = {
    // antd把一个宽度分为24份
    // 表单文字描述部分
    labelCol: {
        span: 3
    },
    // 表单项部分
    wrapperCol: {
        span: 6
    }
}
class Addhtuser extends React.Component {
    state = {

    }
    async componentDidMount() {
        // console.log(this.props);
    }
    // 表单验证
    // ui组件自动验证,验证不通过会报错不会继续走下面的代码
    onFinish = async values => {
        // 添加用户逻辑
        if (this.props.location.state.type === 'add') {
            const { userName, passWord } = values
            // console.log('添加测试');
            // console.log(values);
            const result = await addhtuser(userName, passWord)
            if (result.ok === 1) {
                message.success('注册成功')
                this.props.history.replace('/user/htuser')
            } else {
                message.error(result.msg)
            }
        }else{
            // 修改用户逻辑
            const { passWord } = values
            const result = await updateuser(this.props.location.state.id, passWord)
            if (result.ok === 1) {
                message.success('修改成功')
                this.props.history.replace('/user/htuser')
            } else {
                message.error(result.msg)
            }
        }
    }
    render() {
        const { id, type } = this.props.location.state
        return (
            <Card title={
                <>
                    <Link to="/user/htuser">
                        <ArrowLeftOutlined />
                    </Link>
                    <span>{type === 'add' ? '添加用户' : '修改用户'}</span>
                </>
            } >
                <Form
                    // 给表单中的表单项布局
                    {...layout}
                    // name='subject'
                    // 当点击表单内的提交按钮,onFinish会触发
                    onFinish={this.onFinish}
                >
                    {/* form表单中每一个表单项都需要使用Form.Item包裹 */}
                    {/* 当修改用户的时候,不渲染用户名 */}
                    {this.props.location.state.id?'':<Form.Item
                        // 表示提示文字
                        label='用户名'
                        // 表单项提交时的属性
                        name='userName'
                        // 校验规则
                        rules={[
                            {
                                required: true,
                                // 校验不通过时的提示文字
                                message: '请输入课程分类!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>}

                    <Form.Item
                        label='密码'
                        name='passWord'
                        rules={[
                            {
                                required: true,
                                message: '请输入密码'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        {/* htmlType表示这个按钮是表单内的提交按钮 */}
                        <Button type='primary' htmlType='submit'>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default Addhtuser