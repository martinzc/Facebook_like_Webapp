"use strict"

const models = require('./models.js')
var isLoggedIn = require('./auth').isLoggedIn
const md5 = require('md5')

const Posts = models.Posts
const Profiles = models.Profiles
const uploadImage = require('./uploadCloudinary')

const getArticles = (req, res) => {
	let id = req.params.id;
	if (id) {
		Posts.findOne({ _id: id }, function(err, postObj) {
			// check if the article is found
			if (!postObj) {
				res.sendStatus(400)
				return
			}
			var comments = []
			postObj.comments.forEach(function(element) {
				comments.push({
					commentId: element.commentId,
					author: element.author,
					text: element.text,
					date: element.date
				})
			})
			var payload = {articles: [{
				_id: postObj._id,
				author: postObj.author,
				text: postObj.text,
				date: postObj.date,
				img: postObj.img,
				comments: comments
			}]}
			res.send(payload)
		});
	} else {
		var username = req.user
		Profiles.findOne({ username: username }, 
		 function(err, profileObj) {
			 // check if the article is found
			if (!profileObj) {
				res.sendStatus(400)
				return
			}
			let followingList = []
			profileObj.following.forEach(function(element) {
			followingList.push(element)
			})
			followingList.push(req.user)
			Posts.
				find().
				where('author').in(followingList).
				limit(10).
				sort('-date').
				exec(function(err, postObjects) {
					res.send({articles: postObjects})
					return
				})
		})
	}
}

const postArticles = (req, res) => {
	var newPost = new Posts({
		author: req.user,
		text: req.body.text,
		date: new Date().toISOString(),
		img: req.fileurl,
		comments: req.body.comment
	})
	newPost.save();

	var payload = {articles: [{
		_id: newPost._id,
		author: newPost.author,
		text: newPost.text,
		date: newPost.date,
		img: newPost.img,
		comments: newPost.comments
	}]}
	res.send(payload)
}

const putArticles = (req, res) => {
	let id = req.params.id;
	var text = req.body.text;
	let commentId = req.body.commentId;
	var payload;
	if (commentId) {
		Posts.findOne({ _id: id }, function(err, postObj) {
			// check if the article is found
			if (!postObj) {
				res.sendStatus(400)
				return
			}
			let comments = []
			// Loop through all comments, change the one that has the sepcified ID
			postObj.comments.forEach(function(element) {
				let elementText = element.text
				if (commentId == element.commentId) {
					elementText = text;
				}
				comments.push({
					commentId: element.commentId,
					author: element.author,
					text: elementText,
					date: element.date
				})
			})
			// Push a new comment if commentId is -1
			if (commentId == '-1') {
				const newCommentId = md5([postObj.author, new Date()].join(':'))
				comments.push({
					commentId: newCommentId,
					author: req.user,
					text: text,
					date: new Date().toISOString()
				})
			}
			postObj.comments = comments
			postObj.save()
			payload = {articles: [{
				_id: postObj._id,
				author: postObj.author,
				text: postObj.text,
				date: postObj.date,
				img: postObj.img,
				comments: postObj.comments
			}]}
			res.send(payload)
		});
	} else {
		Posts.findOne({ _id: id }, function(err, postObj) {
			// check if the article is found
			if (!postObj) {
				res.sendStatus(400)
				return
			}
			// Only update the body of the article
			postObj.text = text;
			postObj.save();
			payload = {articles: [{
				_id: postObj._id,
				author: postObj.author,
				text: text,
				date: postObj.date,
				img: postObj.img,
				comments: postObj.comments
			}]}
			res.send(payload)
		});
	}
}

module.exports = app => {
     app.get('/articles/:id*?', isLoggedIn, getArticles)
     app.put('/articles/:id*?', isLoggedIn, putArticles)
     app.post('/article', isLoggedIn, uploadImage('Article'), postArticles)
}
