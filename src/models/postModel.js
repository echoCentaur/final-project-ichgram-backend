const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)