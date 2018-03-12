const mongoose = require('mongoose');
module.exports = mongoose.model('User', {
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    created_on: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String
    }
})