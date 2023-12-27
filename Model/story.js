
const mongoose = require("mongoose")
const schema = mongoose.Schema
const storyschema = new schema({
    title: { type: String, default: null },
    music: { type: String, default: null },
    Viewed: { type: Number },
    viewed_count: { type: Number, default: 0 },
    storyliked: { type: String, default: null },
    otherReaction: { type: String, default: 0 }

})

module.exports = mongoose.model('story', storyschema)