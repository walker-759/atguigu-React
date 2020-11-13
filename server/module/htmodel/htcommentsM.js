const Db = require('../db')
const HTcommentsModel = require("../collections/commentsList")
const commentsListM = new Db(HTcommentsModel)
module.exports.getcomments = async (req, res) => {
    // 拿到视频映射id
    const videoId = req.query.videoId
    // 通过这个id去查找视频对应的所有评论
    const commentsList = await commentsListM.find({
        whereObj: {
            videoId
        },
        sort: {
            commentTime: -1
        }
    })
    res.json({
        ok: 1,
        msg: '请求成功',
        commentsList
    })
}