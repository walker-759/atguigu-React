import React from 'react'
import Search from './components/Search'
import { Table } from 'antd'
import { gethtuserlist } from '@api/comments'
import moment from 'moment'
class Comments extends React.Component {
    state = {
        comments: [],
        id: ''
    }
    // 接受搜索按钮分发的事件,拿到要查找评论的映射id
    search = async (id) => {
        if (id !== this.state.id) {
            // 发请求拿到评论的数据
            const result = await gethtuserlist(id)
            this.setState({
                comments: result.commentsList,
                id
            })
            // console.log(result);
        }
        
    }

    render() {
        const columns = [
            {
                title: '用户昵称',
                dataIndex: 'nickName',
            },
            {
                title: '用户头像',
                dataIndex: 'userhead',
                render: (res) => {
                    // console.log(res);
                    return <img src={res} style={{ width: 100 }}></img>
                }
            },
            {
                title: '评论信息',
                dataIndex: 'contents',
            },
            {
                title: '评论图片',
                dataIndex: 'commentImg',
                render: (res) => {
                    if(res.length<1){
                        return <>无评论图片</>
                    }
                    const result = res.map((item, index) => {
                        return <img key={index} style={{ width: 100 }} src={item} alt="" />
                    })
                    return result
                }
            },
            {
                title: '评论时间',
                dataIndex: 'commentTime',
                render: commentTime => <span>{moment(commentTime).format('YYYY/MM/DD hh:mm:ss')}</span>
            },
        ];
        return (
            <>
                <Search search={this.search} />
                <Table rowKey="_id" style={{ marginTop: '20px' }} dataSource={this.state.comments} columns={columns} />
            </>
        )
    }
}
export default Comments