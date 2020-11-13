const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    userhead:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('userimgs',schema)