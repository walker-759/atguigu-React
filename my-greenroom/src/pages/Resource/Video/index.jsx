import React from 'react'
import { Table, Space, Button ,Popconfirm, message} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getcover } from './redux'
// 删除视频
import { htremovevideo } from '@api/video'

@connect(state => ({ cover: state.cover }), { getcover })

class Comments extends React.Component {
    state = {
    }
    // 组件挂载拿封面数据
    async componentDidMount() {
        this.props.getcover(1)
    }
    // 页面切换
    pagechange = (page, pagesize) => {
        this.props.getcover(page)
    }
    // 查看视频详情
    showvideo = (res) => () => {
        // console.log(res);
        this.props.history.replace('/res/showvideo', { id: res.id })
    }
    // 添加视频
    gotoadd = () => {
        // console.log(1);
        this.props.history.replace('/res/addvideo')
    }
    // 删除视频
    deletevideo=(res)=> async ()=>{
        // console.log(res);
        const result = await htremovevideo(res.id)
        // console.log(result);
        if(result.ok===1){
            message.success(result.msg)
            this.props.getcover(1)
        }else{
            message.error(result.msg)
        }
    }
    render() {
        const columns = [
            {
                title: '视频名称',
                dataIndex: 'videoName'
            },
            {
                title: '视频id',
                dataIndex: 'id'
            },
            {
                title: '封面',
                dataIndex: 'videoCover',
                render: (res) => {
                    // console.log(res);
                    return <img src={res} alt="" style={{ width: '120px' }} />
                }
            },
            {
                title: '时长',
                dataIndex: 'videoLength'
            },
            {
                title: '播放量',
                dataIndex: 'amount'
            },
            {
                title: '操作',
                key: 'action',
                render: (res) => (
                    <Space size="small">
                        <Button type="link" onClick={this.showvideo(res)}>查看详情</Button>
                        {/*  */}
                        <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={this.deletevideo(res)} >
                            <Button type="link" danger>删除</Button>
                        </Popconfirm>,
                    </Space>
                ),
            },
        ];
        return (
            <>
                <Button onClick={this.gotoadd} type="primary" icon={<PlusCircleOutlined />} size='middle' style={{ marginBottom: '20px' }}>
                    添加视频
                </Button>
                <Table
                    columns={columns}
                    dataSource={this.props.cover.item}
                    rowKey="_id"
                    pagination={{
                        total: this.props.cover.total,
                        defaultCurrent: 1,
                        defaultPageSize: 3,
                        onChange: this.pagechange,
                        current: this.props.cover.pageIndex
                    }}
                />
            </>
        )
    }
}
export default Comments

/**


amount: 0
id: 3
videoCover: "http://47.107.188.200/coverlist/3.webp"
videoLength: "00:16:11"
videoName: "幸福不会来敲门"
_id: "5f3bd8496da1ebdf1073f597"
 */