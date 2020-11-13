const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    videoCover:{
        type:String,
        required:true
    },
    videoName:{
        type:String,
        required:true
    },
    videoLength:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('coverlists',schema)