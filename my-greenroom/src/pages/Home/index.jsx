import React from 'react'
import { Row, Col, Statistic, Progress } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons"
import Card from '@comps/Card'
import { AreaChart, ColumnChart } from 'bizcharts';
import { getusercount } from '@api/statistics'
class Home extends React.Component {
    state = {
        loading: false,
        usercount:0
    }
    async componentDidMount() {
        //请求之前,改成展示骨架屏
        this.setState({
            loading: true
        })
        // 发请求,拿数据,需要统计的数据
        const result = await getusercount()
        // console.log(result);
        this.setState({
            loading: false,
            usercount:result.count
        })

        // setTimeout(() => {
        //     //表示数据拿到了
        //     this.setState({
        //         loading: false
        //     })
        // }, 2000)
    }
    data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];
    datato = [
        {
            type: '家具家电',
            sales: 38,
        },
        {
            type: '粮油副食',
            sales: 52,
        },
        {
            type: '生鲜水果',
            sales: 61,
        },
        {
            type: '美容洗护',
            sales: 145,
        },
        {
            type: '母婴用品',
            sales: 48,
        },
        {
            type: '进口食品',
            sales: 38,
        },
        {
            type: '食品饮料',
            sales: 38,
        },
        {
            type: '家庭清洁',
            sales: 38,
        },
    ];
    render() {
        const firstRowCol = {
            // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
            // span表示元素在行中占的格数
            // 一行共24个格
            xs: { span: 24 },
            md: { span: 12 },
            lg: { span: 6 }
        }
        const progress = 99

        return (
            <div>
                {/* // gutter 表示栅格之间的间隔
        // [水平方向, 垂直方向]
        // 注意: 如果col中只写了文字,看不出栅格间隔的效果,要写元素/组件
        row代表一行
        col表示一列
        
        */}
                <Row gutter={[16, 16]}>
                    <Col {...firstRowCol}>
                        <Card
                            // 标题
                            title={
                                <Statistic title="用户总量" value={this.state.usercount} />
                            }
                            footer={<span>今日注册量:10</span>}
                        >
                            {/* 内容写在子节点位置 */}
                            {/* <span>同周比12%<CaretUpOutlined style={{ color: 'red' }} /></span>

              <span style={{ marginLeft: '10px' }}>同比周16%<CaretDownOutlined style={{ color: '#3f8600' }} /></span> */}
                        </Card>
                    </Col>
                    <Col {...firstRowCol}>
                        <Card
                            // 标题
                            title={
                                <Statistic title="累计视频播放量" value={100} />
                            }
                            footer={<span>今日播放量 12</span>}
                        >
                            <AreaChart
                                data={this.data}
                                smooth={true}
                                xField='year'
                                yField='value'
                                xAxis={{
                                    visible: false,
                                }}
                                yAxis={{
                                    visible: false,
                                }}
                                padding={'0'}
                                forceFit={true}
                                color={['#7899a8']}
                            />
                        </Card>
                    </Col>
                    <Col {...firstRowCol}>
                        <Card
                            title={
                                <Statistic title="访问量" value={11775} />
                            }
                            footer={<span>转化率 88.75%</span>}
                        >
                            <ColumnChart
                                data={this.datato}
                                forceFit
                                padding='0'
                                xField='type'
                                yField='sales'
                                xAxis={{
                                    visible: false,
                                }}
                                yAxis={{
                                    visible: false,
                                }}
                                meta={{
                                    type: {
                                        alias: '类别',
                                    },
                                    sales: {
                                        alias: '销售额(万)',
                                    },
                                }}
                            />
                        </Card>
                    </Col>
                    <Col {...firstRowCol}>
                        <Card
                            title={
                                <Statistic title="当前完成进度" value={'11.22万'} />
                            }
                            footer={<span>{`完成进度${progress}%`}</span>}
                            loading={this.state.loading}
                        >
                            <Progress
                                strokeColor={{
                                    from: '#108ee9',
                                    to: '#87d068',
                                }}
                                percent={progress}
                                status="active"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Home