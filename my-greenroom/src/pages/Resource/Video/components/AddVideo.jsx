import React from 'react'
import { Card, Button, Form, Input, Switch, message, Upload } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons' //导入antd中的icon

// 添加视频函数引进来
import {addvideo} from '@api/video'

import MyUpload from './MyUpload'

// 表单布局
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
class AddVideo extends React.Component {
    state = {
    }
    onFinish = async values => {
        const result = await addvideo(values)
        console.log(result);
        if(result.ok===1){
            this.props.history.replace('/res/video')
            message.success(result.msg)
        }else{
            message.error(result.msg)
        }
      }
    render() {
        return (
            <Card title={
                <>
                    <Link to="/res/video">
                        <ArrowLeftOutlined />
                    </Link>
                    <span>添加视频</span>
                </>
            } >
                <Form
                    // 给表单中的表单项布局
                    {...layout}
                    // 当点击表单内的提交按钮,onFinish会触发
                    onFinish={this.onFinish}
                    // 提交失败的时候会触发
                    // onFinishFailed={onFinishFailed}

                    // 表单默认值，只有初始化以及重置时生效
                    // 也就是表单提交时候的属性
                    initialValues={{
                        // 键就是表单项的name属性的值
                        free: true
                    }}
                >
                    <Form.Item
                        // 表示提示文字
                        label='视频名称'
                        // 表单项提交时的属性
                        name='videoName'
                        // 校验规则
                        rules={[
                            {
                                required: true,
                                // 校验不通过时的提示文字
                                message: '请输入视频名称'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='视频映射ID'
                        name='id'
                        rules={[
                            {
                                required: true,
                                message: '请输入视频映射ID'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='视频时长'
                        name='videoLength'
                        rules={[
                            {
                                required: true,
                                message: '请输入视屏时长'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='上传视频封面'
                        name='videoCover'
                        rules={[
                            {
                                required: true,
                                message: '请选择上传视频封面'
                            }
                        ]}
                    >
                        {/* 上传逻辑复杂,所以封装到MyUpload中 */}
                        <MyUpload type="img"></MyUpload>
                    </Form.Item>

                    <Form.Item
                        label='上传视频'
                        name='videoUrl'
                        rules={[
                            {
                                required: true,
                                message: '请选择上传视频'
                            }
                        ]}
                    >
                        {/* 上传逻辑复杂,所以封装到MyUpload中 */}
                        <MyUpload type="video"></MyUpload>
                    </Form.Item>

                    <Form.Item>
                        {/* htmlType表示这个按钮是表单内的提交按钮 */}
                        <Button type='primary' htmlType='submit'>
                            添加
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default AddVideo

/*
    视频封面数据
    amount: 0
    id: 3
    videoCover: "http://47.107.188.200/coverlist/3.webp"
    videoLength: "00:16:11"
    videoName: "幸福不会来敲门"
    _id: "5f3bd8496da1ebdf1073f597"


*/