import React from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { reqGetqiniutoken } from '@api/video'

import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'


class MyUpload extends React.Component {
    constructor() {
        super()
        const str = localStorage.getItem('upload_token')
        if (str) {
            // console.log("之前有");
            const result = JSON.parse(str)
            this.state = {
                expires: result.expires,
                upload_token: result.uploadToken
            }
        } else {
            // console.log("第一次");
            this.state = {
                expires: 0,
                upload_token: ''
            }
        }
    }
    // SIZE = 
    componentDidMount() {
        // console.log(this.props);
    }
    handleBeforeUpload = (file, fileList) => {
        return new Promise(async (res, rej) => {
            const SIZE = this.props.type === 'img' ? 2 * 1024 * 1024 : 10 * 1024 * 1024
            // 限制大小
            if (file.size > SIZE) {
                message.error(`${this.props.type === 'img' ? '图片' : '视频'}太大,不能超过${this.props.type === 'img' ? '2m' : '10m'}`)
                rej()
                return
            }
            // 判断过期
            if (Date.now() > this.state.expires) {
                console.log('第一次或者过期了');
                const { expires, uploadToken } = await reqGetqiniutoken()
                // console.log(expires);
                // console.log(uploadToken);
                // 过期了,更新缓存
                this.saveUploadToken(expires, uploadToken)
            }
            res(file)
        })
    }
    saveUploadToken = (expires, uploadToken) => {
        const targetTIME = Date.now() + expires * 1000 - 2 * 60 * 1000
        expires = targetTIME
        const upload_token = JSON.stringify({ uploadToken, expires })
        // 缓存
        localStorage.setItem('upload_token', upload_token)
        this.setState({
            upload_token,
            expires
        })
    }
    handleCustomRequest = (val) => {
        const type = this.props.type === 'img' ? ['image/*'] : ['video/*']
        // 创建putExtra对象
        const putExtra = {
            mimeType: type //用来限定上传文件类名
        }
        // 文件
        const file=val.file

        // 创建config对象
        const config = {
            region: qiniu.region.z2 // 选择上传域名区域 z2表示华南
        }
        // 生成key
        let key = nanoid(10) //生成一个长度为10的id,保证是唯一的
        key=key+'初念'

        // token 需要给本地服务器发送请求获取 (时效两个小时)
        // 从缓存中拿到token
        const res = JSON.parse(localStorage.getItem('upload_token'))
        const token = res.uploadToken

        const observable = qiniu.upload(
            file, // 上传的文件
            key, //最终上传之后的文件资源名 (保证唯一) 使用nanoid库,生成这个key
            token, //上传验证信息，前端通过接口请求后端获得
            putExtra,
            config
        )

        
        

        // 创建上传过程触发回调函数的对象
        const observer = {
            //上传过程中触发的回调函数
            next(res) {
                // console.log(res);
                val.onProgress(res.total)
             },
            //上传失败触发的回调函数
            error(res) { 
                // value.onError(res)
            },
            // 上传成功触发的回调函数
            complete:(res)=> {
                val.onSuccess(res)
                // console.log('上传成功');
                // console.log(res);
                // console.log(this.props);
                this.props.onChange('http://qfd5ztyxy.hn-bkt.clouddn.com/'+res.key)
             }
        }
        this.subscription = observable.subscribe(observer) // 上传开始
    }
    componentWillUnmount(){
        this.subscription &&this.subscription.unsubscribe() // 上传取消
    }
    render() {
        return (
            <div>
                <Upload
                    beforeUpload={this.handleBeforeUpload}
                    customRequest={this.handleCustomRequest}
                    accept={this.props.type==='img'?'image/*':'video/*'}
                >
                    <Button>
                        <UploadOutlined /> 请选择上传
                    </Button>
                </Upload>
            </div>
        )
    }
}
export default MyUpload