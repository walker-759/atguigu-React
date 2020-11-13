const Db = require('../db')
const userModel = require("../collections/userList")
const userListM = new Db(userModel)

// 操作usering集合
const userImgModel = require('../collections/userImg')
const userImgM = new Db(userImgModel)

const { encodeMd5, sendjson,encodeToken } = require('../utils')

// 注册逻辑
module.exports.userRegister = async (req, res) => {
    try {
        // 拿到账号,密码,昵称   在加上base64的图片
        const { useRaccount, nickName, passWord, userhead } = req.body
        // 根据账号查找信息
        const result = await userListM.findOneRecord({ useRaccount })
        // console.log(result);
        if (result) {
            // 用户名被占用
            sendjson(res, -1, '改账号已被占用,请重新输入')
        } else {
            // console.log(userhead);
            
            // 记得把注册事件写进去
            await userListM.insert({
                useRaccount,
                nickName,
                passWord: encodeMd5(passWord),
                regTime: Date.now()
            })
            // 拿到刚注册的用户的id
            const user = await userListM.findOneRecord({useRaccount})
            const userId=user._id
            // console.log(user);
            await userImgM.insert({
                userId,
                userhead
            })
            sendjson(res, 1, '注册成功')
        }
    } catch (error) {
        // 注册有问题报网络
        console.log(error);
        sendjson(res, -1, '网络连接错误')
    }
}

// 登录
module.exports.userLogin = async (req, res) => {
    //拿到用户名和密码
    const { useRaccount, passWord } = req.body
    try {
        // 查找用户名和密码是否正确
        const userInfo = await userListM.findOneRecord({
            useRaccount,
            // 密码记得加密后在去查找
            passWord: encodeMd5(passWord)
        })
        console.log(encodeMd5(passWord));
        console.log('1');
        
        
        if (userInfo) {
            res.json({
                ok:1,
                msg:'成功',
                token:encodeToken({
                    userId:userInfo._id,
                    nickName:userInfo.nickName
                }),
                nickName:userInfo.nickName
            })
        } else {
            // 失败
            sendjson(res, -1, '登录失败')
        }
    } catch (error) {
        sendjson(res,-1,'网络连接失败')
    }


}

// 拿到用户总数
module.exports.getusercount = async (req,res)=>{
    const count = await userListM.count()
    res.json({
        ok:1,
        msg:'成功',
        count
    })
}