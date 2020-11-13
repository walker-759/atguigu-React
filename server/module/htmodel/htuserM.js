const Db = require('../db')
const HTuserModel = require("../htcollections/htuserList")
const HTuserListM = new Db(HTuserModel)

const { encodeMd5, sendjson, encodeToken } = require('../utils')


// 后台用户登录
module.exports.HTuserLogin = async (req, res) => {
    //拿到用户名和密码
    const { userName, passWord } = req.body
    try {
        // 查找用户名和密码是否正确
        const userInfo = await HTuserListM.findOneRecord({
            userName,
            // 密码记得加密后在去查找
            passWord: encodeMd5(passWord)
        })
        // console.log(userInfo);
        
        if (userInfo) {
            res.json({
                ok: 1,
                msg: '成功',
                token: encodeToken({
                    userId: userInfo._id,
                    userName: userInfo.userName
                }),
                userName: userInfo.userName
            })
        } else {
            // 失败
            sendjson(res, -1, '登录失败')
        }
    } catch (error) {
        sendjson(res, -1, '网络连接失败')
    }
}

// 获取用户分页列表
module.exports.Htgetuserlist= async (req,res)=>{
    const pageIndex=(req.query.pageIndex || 1)*1
    let limit = 3
    let pageSum = 1
    const count = await HTuserListM.count()
    pageSum = Math.ceil(count / limit);
    if (pageSum < 1) pageSum = 1;
    if (pageIndex < 1) pageIndex = 1;
    if (pageIndex > pageSum) pageIndex = pageSum;
    let coverList = await HTuserListM.find({
        limit,
        skip: (pageIndex - 1) * limit,
        sort: {
            regTime: -1
        }
    })
    coverList=coverList.map((item)=>{
        return {
            userName:item.userName,
            regTime:item.regTime,
            _id:item._id
        }
    })
    // console.log(coverList);
    res.json({
        ok:1,
        msg:'获取成功',
        total:count,
        item:coverList,
        pageSum,
        pageIndex
    })
}

// 新增后台用户
module.exports.addhtuser = async (req,res)=>{
    const {userName,passWord} = req.body
    const result = await HTuserListM.findOneRecord({userName})
    if(result){
        sendjson(res,-1,'用户名已注册')
    }else{
        await HTuserListM.insert({
            userName,
            passWord:encodeMd5(passWord),
            regTime:Date.now()
        })
        sendjson(res,1,'注册成功')
    }
}

// 修改后台用户
module.exports.updateuser = async (req,res)=>{
    const {id,passWord} = req.body
    try {
        await HTuserListM.updateOne(id, {
            passWord:encodeMd5(passWord)
        })
        sendjson(res,1,'修改成功')
    } catch (error) {
        sendjson(res,-1,'修改失败')
    }
}

// 删除后台用户
module.exports.deleteuser = async (req,res)=>{
    const {id} = req.query
    const result = await HTuserListM.findOneRecord({_id:id})
    if(result.userName==='gaoxianming'){
        sendjson(res,-2,'您无权限删除此用户')
        return
    }
    try {
        await HTuserListM.deleteOneById(id)
        sendjson(res,1,'删除成功')
    } catch (error) {
        sendjson(res,-1,'删除失败')
    }
}