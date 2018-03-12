const mongoose = require('mongoose');
module.exports = mongoose.model('Post', {
    title: {
        type: String,
        unique: true
    },
    content: String,
    created_on: {
        type: Date,
        default: Date.now
    },
    author: String
})