const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    datereviewed: {
        type: Date
    },
    username: {
        type: String
    },
    postTitle:{
        type: String
    }
})

const reviews = mongoose.model('reviews', reviewSchema);

module.exports = reviews;