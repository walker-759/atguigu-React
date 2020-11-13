const Db = require('../db')
// 操作视频封面集合
const coverModel = require("../collections/coverList")
const coverListM = new Db(coverModel)

// 操作视频集合
const videoModel = require("../collections/videoList")
const videoListM = new Db(videoModel)
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
        coverList,
        total: count
    })
}


// 获取视频详细数据
module.exports.getvideo = async (req, res) => {
    const id = (req.query.id) / 1
    try {
        const video = await videoListM.findOneRecord({ id })
        res.json({
            ok: 1,
            msg: '请求成功',
            video
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: -1,
            msg: '请求失败'
        })
    }
}

// 添加视频

module.exports.htaddvideo = async (req, res) => {
    const { videoCover, videoName, videoLength, videoUrl } = req.body
    let id = req.body.id * 1
    // 先判断id是否冲突
    const count = await videoListM.findOneRecord({ id })
    if (count) {
        sendjson(res, -2, '映射id冲突,请更换')
        return
    } else {
        try {
            // 存封面集合
            await coverListM.insert({
                id,
                videoCover,
                videoName,
                videoLength,
                amount: 0
            })

            // 拿到视频总条数
            const all = await videoListM.count()
            // 生成一个1 - 文档总条数的数组
            const sj1 = Math.round(Math.random() * (all - 1)) + 1
            const sj2 = Math.round(Math.random() * (all - 1)) + 1
            // 拿到视频封面所有数组
            const coverList = await coverListM.find({})
            // 求出推荐数据
            const elseVideos = [coverList[sj1], coverList[sj2]]

            // 存视频集合
            await videoListM.insert({
                id,
                videoCover,
                videoLength,
                videoUrl,
                videoName,
                elseVideos
            })
            sendjson(res, 1, '添加成功')
        } catch (error) {
            console.log(error);
            sendjson(res, -1, '网络连接错误')
        }
    }

}

// 删除视频
module.exports.htremovevideo = async (req, res) => {
    const { id } = req.query
    try {
        await coverListM.deleteOneByys(id)
        await videoListM.deleteOneByys(id)
        // console.log(id);
        sendjson(res, 1, '删除视频测试成功')
    } catch (error) {
        console.log(error);
        
        sendjson(res, -1, '网络连接失败')
    }
}