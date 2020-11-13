const Db = require('../db')
const coverModel = require("../collections/coverList")
const coverListM = new Db(coverModel)
const { sendjson } = require('../utils')
// 获取视频分页数据
module.exports.getcoverlist = async (req, res) => {
    let pageIndex = (req.query.pageIndex || 1) * 1;
    const limit = 3
    let pageSum = 1
    // 拿到文档总条数
    const count = await coverListM.count()
    // 求出总页数
    pageSum = Math.ceil(count / limit);
    if (pageSum < 1) pageSum = 1;
    if (pageIndex < 1) pageIndex = 1;
    if (pageIndex > pageSum) pageIndex = pageSum;
    const coverList = await coverListM.find({
        limit,
        skip: (pageIndex - 1) * limit,
        sort: {
            amount: -1
        }
    })
    res.json({
        ok: 1,
        msg: '请求成功',
        pageIndex,
        pageSum,
        coverList
    })
}
// 用户观看就增加播放量
module.exports.updateamount = async (req,res) => {
    const id = (req.body.id)*1
    try {
        await coverListM.updateOneById(id, {
            $inc:{
                amount:1
            }
        })
        sendjson(res,1,'修改成功')
    } catch (error) {
        sendjson(res,-1,'网络连接错误')
    }
    // console.log(id);
    // sendjson(res,1,'测试成功')
}