const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    postID: {
        type: String,
        enum: []
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
})


const users = mongoose.model('users', userSchema)
module.exports = users;