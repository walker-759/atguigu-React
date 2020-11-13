import React from 'react'
import {getcoverlist} from '@api/video'
import { Select ,Button } from 'antd';
const { Option } = Select;

class Search extends React.Component {
    state = {
        coverlist:[],
        total:0
    }
    componentDidMount(){
        this.getcover()
    }
    // 获取视频封面分页数据
    getcover= async (pageIndex=1)=>{
        const result = await getcoverlist(pageIndex)
        const coverlist = result.coverList
        // console.log(result);
        // 把旧数据和新数据进行拼接
        this.setState({
            coverlist:[...this.state.coverlist,...coverlist],
            total:result.total,
            id:''
        })
    }
    // 选中下拉框拿到id
    handleChange = (value) => {
        // console.log(value);
        this.setState({
            id:value
        })
    }
    // 定义pageIndex记录当前第几页
    pageIndex=1
    // 点击获取更多数据
    handleaddlist=()=>{
        // 发请求拿数据
        this.getcover(++this.pageIndex)
    }
    // 点击搜索,分发父级组件获取评论信息函数,把id传过去
    search=()=>{
        this.props.search(this.state.id)
    }
    render() {
        return (
            <>
                <div>
                    <span style={{marginRight:'20px'}}>请选择视频</span>
                    <Select 
                    defaultValue="请选择" 
                    style={{ width: 220 }} 
                    onChange={this.handleChange}
                    dropdownRender={menu => {
                        return <>
                            {/* menu就是所有option */}
                            {menu}
                            {this.state.total > this.state.coverlist.length && <Button type="link" onClick={this.handleaddlist}>点击展示更多数据</Button>}
                        </>
                    }}
                    >
                        {
                            this.state.coverlist.map((item)=>{
                                return <Option key={item._id} value={item.id}>{item.videoName}</Option>
                            })
                        }
                    </Select>
                    <Button type="primary" style={{marginLeft:'10px'}} onClick={this.search}>搜索</Button>
                </div>
            </>
        )
    }
}
export default Search