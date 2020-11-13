const Db = require('../db')
const bannerModel = require("../collections/bannerList")
const bannerListM = new Db(bannerModel)

module.exports.getbannerlist = async (req,res)=>{
    try {
        const bannerList = await bannerListM.find({})
        res.json({
            ok:1,
            msg:'请求成功',
            bannerList:bannerList
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:-1,
            msg:'请求失败'
        })
    }
}