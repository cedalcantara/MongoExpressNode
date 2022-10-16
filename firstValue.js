const mongoose = require('mongoose');
const users = require('./models/users');
const posts = require('./models/posts');
const reviews = require('./models/reviews');

mongoose.connect('mongodb://localhost:27017/Airexe')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const USER = [
    {
        username: 'cedalcantara',
        password: '12345678',
        contact: '09760528584',
        fullname: 'Cedrick Alcantara',
    }
]

const POST = [
    {
        title: 'Sta. Ursula Parish Church',
        desc: 'It is a hundred year old church that was preserved until the contemporary times.',
        uploader: 'cedalcantara',
        datePosted: '2013-11-12',
        city: 'Binangonan',
        state: 'Rizal',
        photo: 'https://upload.wikimedia.org/wikipedia/en/3/39/Sta._ursula_parish_church.jpg'
    }
]
const REVIEW = [
    {
        review: 'This is a sturdy worship place!',
        datereviewed: '2017-10-11',
        username: 'cedalcantara',
        postTitle: 'Sta. Ursula Parish Church'
    }
]

// users.insertMany(USER)
//     .then(res => {
//         console.log(res);
//     })
//     .catch(e => {
//         console.log(e);
//     })

posts.insertMany(POST)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })

reviews.insertMany(REVIEW)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })