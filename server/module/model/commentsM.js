const Db = require('../db')
const commentsModel = require("../collections/commentsList")
const commentsListM = new Db(commentsModel)

// 操作usering集合
const userImgModel = require('../collections/userImg')
const userImgM = new Db(userImgModel)

const { encodeMd5, sendjson, encodeToken, decodeToken } = require('../utils')


// 添加评论,token不能过期
module.exports.addcomments = async (req, res) => {
    // 拿到要添加的数据
    const comments = req.body.comments
    // 拿到token
    const token = req.headers.authorization
    const videoId = req.body.videoId
    const commentsImgArr = req.body.commentsImgArr
    // console.log(commentsImgArr);

    try {
        const { ok, msg, payload } = decodeToken(token)
        
        if (ok === 1) {
            // console.log(videoId, payload.userId, payload.nickName, comments, Date.now());
            const result = await userImgM.findOneRecord({
                userId: payload.userId
            })
            await commentsListM.insert({
                videoId,
                userId: payload.userId,
                nickName: payload.nickName,
                contents: comments,
                commentTime: Date.now(),
                commentImg: commentsImgArr,
                userhead: result.userhead
            })
            sendjson(res, 1, '添加成功')
        } else {
            res.json({
                ok,
                msg
            })
        }
    } catch (error) {
        sendjson(res, -1, '网络连接异常')
    }
}
// 获取用户评论
module.exports.getcomments = async (req, res) => {

    const videoId = req.query.videoId
    let pageIndex = (req.query.pageIndex || 1) * 1;
    const limit = 3
    let pageSum = 1
    // 拿到文档总条数
    const count = await commentsListM.count({videoId})
    // 求出总页数
    pageSum = Math.ceil(count / limit);
    if (pageSum < 1) pageSum = 1;
    if (pageIndex < 1) pageIndex = 1;
    if (pageIndex > pageSum) pageIndex = pageSum;
    const commentsList = await commentsListM.find({
        whereObj: {
            videoId
        },
        limit,
        skip: (pageIndex - 1) * limit,
        sort: {
            commentTime: -1
        }
    })
    // console.log(count);
    
    // console.log(pageSum);
    
    res.json({
        ok: 1,
        msg: '请求成功',
        pageIndex,
        pageSum,
        commentsList
    })
}
