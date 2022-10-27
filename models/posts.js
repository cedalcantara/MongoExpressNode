const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 20
    },
    uploader: {
        type: String
    },
    datePosted: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    reviewID: {
        type: String,
        enum: []
    },
    photo: {
        type: String,
        required: true
    }
})

const posts = mongoose.model('posts', postSchema);

module.exports = posts;