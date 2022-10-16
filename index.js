const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const user = require('./models/users');
const post = require('./models/posts');
const review = require('./models/reviews');
const methodOverride = require('method-override');

app.set('views', path .join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/Airexe')
    .then(()=>{
        console.log('connection open');
    })
    .catch(err =>{
        console.log("error");
        console.log(err);
    })


    //landing page queries
app.get('/', async (req,res,next)=>{
    const loggedin = await user.findOne({isLoggedIn: true});
    const posts = await post.find();
    res.render('index',{loggedin, posts});
})

//form update
app.get('/details/:id/update', async (req, res) => {
    const {id} = req.params;
    const pst = await post.findById(id);
    const loggedin = await user.findOne({isLoggedIn: true});
    console.log(loggedin);
    res.render('update', {pst, loggedin});
})

// Update
app.put('/details/:id', async (req, res) => {
    const {id} = req.params;
    const pst = await post.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/details/${pst._id}`);
})

//register
app.get('/register', (req,res,next)=>{
    res.render('register');
})

//create new account
app.post('/register', async (req, res)=>{
    const newAcc = new user(req.body);
    await newAcc.save();
    res.redirect('login');
})

//add new post
app.post('/', async (req, res)=>{
    const newPost = new post(req.body);
    const loggedin = await user.findOne({isLoggedIn: true});
    await newPost.save();
    res.redirect('/');
    const author = await post.findOneAndUpdate({title:`${req.body.title}`}, {uploader: `${loggedin.username}`}, {runValidators: true, new: true});
})

//add reviews
app.post('/details/:uid', async (req, res)=>{
    const newReview = new review(req.body);
    const loggedin = await user.findOne({isLoggedIn: true});
    const {uid} = req.params;
    console.log(req.params);
    const pst = await post.findById(uid);
    const rvID = newReview._id;
    await newReview.save();
    res.redirect(`/details/${uid}`);
    const update = await review.findOneAndUpdate({_id:`${rvID}`}, {username: `${loggedin.username}`,datereviewed:Date(), postTitle:`${pst.title}`}, {runValidators: true, new: true});
})

//logout
app.get('/logout', async (req,res,next)=>{
    const toggler = await user.findOneAndUpdate({isLoggedIn: true},  {$set: {isLoggedIn: false}}, {runValidators: true, new: true});
    console.log(toggler);
    res.redirect('/');
})

//login
app.post('/login', async (req, res)=>{
    const data = await user.find({username: `${req.body.username}`, password: `${req.body.password}`});
        if(data.length!=0) {
            // data.isLoggedin
            const toggler = await user.findOneAndUpdate({username:`${req.body.username}`}, {isLoggedIn: true}, {runValidators: true, new: true});
            
            res.redirect('/');
        }else{
            res.send("Invalid Input!");
        }
})


app.get('/login', (req,res,next)=>{
    res.render('login');
})

// delete
app.delete('/landing/:uid', async(req,res,next)=>{
    const {uid} = req.params;
    const deletePlace = await post.findByIdAndDelete(uid);
    res.redirect('/');
})

// view specific place
app.get('/details/:uid', async(req,res,next)=>{
     const {uid} = req.params;
     const loggedin = await user.findOne({isLoggedIn: true});
     const place = await post.findById(uid);
    const rvw = await review.find();
    res.render('details', {place, loggedin, rvw});
})
 
app.listen(3000, (req,res)=>{
    console.log("Listening on port 3000");
})