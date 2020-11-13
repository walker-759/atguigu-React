const md5 = require('md5')
const jwt = require('jwt-simple')
// 定义盐
const salt = '.-..---.-.-'

// 定义生成及解密token的key
const key = '*&dh'

// 密码md5加密函数
module.exports.encodeMd5 = function(context){
    // 密码拼上盐加密返回
    return md5(salt+context)
}

// 生成token
module.exports.encodeToken = function(payload){
    return jwt.encode({
        ...payload,
        ...{
            loginTime:Date.now()
        }
    }, key)
}

// 解析token
module.exports.decodeToken = function(token){
    try {
        const payload = jwt.decode(token, key)
        console.log(payload);
        
        // console.log(Date.now()-payload.loginTime);
        // 1分钟
        if(Date.now()-payload.loginTime>60*1000*30){
            return {
                ok:-2,
                msg:'过期了'
            }
        }else{
            return {
                ok:1,
                msg:'token解析成功,未过期',
                payload
            }
        }
    } catch (error) {
        return {
            ok:-2,
            msg:'token异常'
        }
    }
}



// 封装res.json
module.exports.sendjson=function(res,ok,msg){
    res.json({
        ok,
        msg
    })
}