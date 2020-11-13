import React from 'react'
import TopBar from '@com/TopBar/TopBar'
import './css/index.less'
import itemImg from './img/itemImg.jpg'
class Collect extends React.Component {
    state = {
        isoperation:false
    }
    change=()=>{
        console.log(1);
    }
    cahngeoperation=(val)=>{
        this.setState({
            isoperation:val
        })
    }
    render() {
        return (
            <>
                <TopBar title="收藏" right="编辑" nav="/personage" cahngeoperation={this.cahngeoperation} />
                <div className="collectWrap">
                    <div className="collecItemList">
                        <div className="collecItem">
                            <div className={this.state.isoperation?'left left1 iconfont icon-lujing':'left iconfont icon-lujing'} onClick={this.change}></div>
                            <div className="center">
                                <img src={itemImg} alt=""/>
                                <div className="text">
                                    <div className="name">西红柿首富11111111111111111111111111111111111</div>
                                    <span>片长:26分</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.isoperation?"operation":'operation1'}>
                        <div className="left">全选</div>
                        <div className="right">删除</div>
                    </div>
                </div>
            </>
        )
    }
}
export default Collect