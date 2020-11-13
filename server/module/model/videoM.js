const Db = require('../db')
const videoModel = require("../collections/videoList")
const videoListM = new Db(videoModel)

module.exports.getvideo = async (req,res)=>{
    const id= (req.query.id)/1
    try {
        const video = await videoListM.findOneRecord({id})
        res.json({
            ok:1,
            msg:'请求成功',
            video
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:-1,
            msg:'请求失败'
        })
    }
}