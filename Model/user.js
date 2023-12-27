const mongoose = require('mongoose')
const schema = mongoose.Schema
const userSchema = new schema({
    Name: { type: String, default: null },
    Email: { type: String, default: null },
    mobileNumber: { type: Number, default: null },
    City: { type: String, default: null },
    Country: { type: String, default: null },
    accessToken: { type: String, default: null },
    deviceType: { type: String, default: null },
    time:{type:Number,default:null},
    enum: ['valid', 'invalid']

})

module.exports = mongoose.model('user', userSchema)

