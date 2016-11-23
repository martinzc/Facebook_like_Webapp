"use strict"

const models = require('./models.js')
var isLoggedIn = require('./auth').isLoggedIn
const md5 = require('md5')

const Posts = models.Posts

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
		Posts.find({}, function(err, postObjs) {
			// check if the article is found
			if (!postObjs) {
				res.sendStatus(400)
				return
			}
			var articles = []
			postObjs.forEach(function(postObj) {
				articles.push({
					_id: postObj._id,
					author: postObj.author,
					text: postObj.text,
					date: postObj.date,
					img: postObj.img,
					comments: postObj.comments
				})
			})
			var payload = {articles: articles}
			res.send(payload)
		});
	}
}

const postArticles = (req, res) => {
	var newPost = new Posts({
		author: req.user,
		text: req.body.text,
		date: new Date().toISOString(),
		img: req.body.img,
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
					author: postObj.author,
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
     app.post('/article', isLoggedIn, postArticles)
}
