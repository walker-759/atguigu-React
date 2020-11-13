const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    videoCover:{
        type:String
    },
    videoLength:{
        type:String
    },
    videoUrl:{
        type:String
    },
    videoName:{
        type:String
    },
    elseVideos:{
        type:[Object]
    }
})
module.exports = mongoose.model('videos',schema)