import React from 'react'
import { Table, Space, Button, Popconfirm, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
// 获取后台用户action
import { gethtuser } from './redux'
// 事件处理包
import moment from 'moment'
// 删除用户函数
import {deleteuser} from '@api/htuser'
@connect(state => ({ userlist: state.userlist }), { gethtuser })
class Users extends React.Component {
    state = {
    }
    // 页面挂在完毕
    componentDidMount() {
        // console.log(this.props);
        this.props.gethtuser(1)
    }
    // 分页逻辑
    pagechange = (page, pagesize) => {
        // console.log(page,pagesize);
        this.props.gethtuser(page)
    }
    // 添加,跳转至添加组件 ,type为标记
    gotoadd = () => {
        this.props.history.replace('/user/addhtuser', { id: '', type: 'add' })
    }
    // 修改,跳转至修改组件,type为标记,id指定修改账号的id
    updateuser = (res) => () => {
        this.props.history.replace('/user/addhtuser', { id: res._id, type: 'update' })
    }
    // 删除
    deleteuser= (res)=>async()=>{
        const result = await deleteuser(res._id)
        if(result.ok===1){
            message.success('删除成功')
            this.props.gethtuser(this.props.userlist.pageIndex)
        }else if(result.ok===-1){
            message.error('删除失败')
        }else{
            // 没有权限删除这个用户
            message.error(result.msg)
        }
    }
    render() {
        const columns = [
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '注册时间',
                width: '500px',
                dataIndex: 'regTime',
                render: regTime => <span>{moment(regTime).format('YYYY/MM/DD hh:mm:ss')}</span>
            },
            {
                title: '操作',
                render: (res) => (
                    <Space size="middle">
                        <Button type="primary" siz="small" onClick={this.updateuser(res)}>修改</Button>
                        <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={this.deleteuser(res)}>
                            <Button type="primary" danger siz="small">删除</Button>
                        </Popconfirm>,
                    </Space>
                ),
            },
        ];
        return (
            <>
                <Button onClick={this.gotoadd} type="primary" icon={<PlusCircleOutlined />} size='middle' style={{ marginBottom: '20px' }}>
                    添加新用户
                </Button>
                <Table
                    rowKey="_id" 
                    columns={columns}
                    dataSource={this.props.userlist.item}
                    pagination={{
                        total: this.props.userlist.total,
                        defaultCurrent: 1,
                        defaultPageSize: 3,
                        onChange: this.pagechange,
                        current:this.props.userlist.pageIndex
                    }}
                />
            </>
        )
    }
}
export default Users