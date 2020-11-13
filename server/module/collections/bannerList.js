const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String
    },
    bannerUrl:{
        type:String
    }
})
module.exports = mongoose.model('banners',schema)