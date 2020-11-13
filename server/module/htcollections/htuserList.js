const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,//不能为空
        unique:true//保证唯一
    },
    passWord:{
        type:String,
        required:true
    },
    regTime:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('htusers',schema)