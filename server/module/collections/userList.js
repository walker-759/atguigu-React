const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    useRaccount:{
        type:String,
        required:true,//不能为空
        unique:true//保证唯一
    },
    nickName:{
        type:String,
        required:true
    },
    passWord:{
        type:String,
        required:true
    },
    regTime:{
        type:Number,
        required:true
    },
    like:{
        // 数组,里面必须是一个对象,存储用户收藏信息
        type:[Object]
    }
})
module.exports = mongoose.model('users',schema)