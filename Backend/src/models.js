"use strict"

var mongoose = require('mongoose')

var url = 'mongodb://heroku_0h90ns6h:g3p3klj3siupu3ih4o3k4kva3f@ds159527.mlab.com:59527/heroku_0h90ns6h'

var userSchema = new mongoose.Schema({
    username: String,
    googleEmail: String,
    salt: String,
    hash: String    
});

var profilesSchema = new mongoose.Schema({
    username: String,
    status: String,
    following: [ String ],
    email: String,
    zipcode: String,
    picture: String,
    dob: Date
});

var postsSchema = new mongoose.Schema({
    author: String,
    text: String,
    date: Date,
    img: String, 
    comments: [{
        commentId: String,
        author: String,
        text: String,
        date: Date
    }] 
});

mongoose.connect(url)
exports.User = mongoose.model('users', userSchema)
exports.Posts = mongoose.model('posts', postsSchema)
exports.Profiles = mongoose.model('profiles', profilesSchema)