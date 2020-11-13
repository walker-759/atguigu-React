const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    videoId:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true,
    },
    nickName:{
        type:String,
        required:true
    },
    contents:{
        type:String,
        required:true
    },
    commentTime:{
        type:Number,
        required:true
    },
    commentImg:{
        type:Array
    },
    userhead:{
        type:String
    }
})
module.exports = mongoose.model('comments',schema)