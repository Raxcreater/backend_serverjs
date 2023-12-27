const { string } = require('joi')
const mongoose = require('mongoose')
const schema = mongoose.Schema
const postSchema = new schema({
    
    title: { type: String },
    likesCount: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comment: { type: String, default: 0 },
    musicsOnPost: { type: String, default: null },
    userId: { type: schema.ObjectId, ref: 'user' },
    isDelete: { type: Boolean, default: false },
    post_time: { type: Number, default: new Date() }
})
module.exports = mongoose.model("post",postSchema)
