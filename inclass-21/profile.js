"use strict"

const md5 = require('md5')

var cookieKey = 'sid'

var articles = { articles: [ { id: 1, author: 'Scott', text: 'article1'}, 
	{ id: 2, author: 'LALA', text: 'article2'}, { id: 3, author: 'MOMO', text: 'article3'}] }
var num_articles = 3
var userInfo = []

const index = (req, res) => {
   res.send({ hello: 'world' })
}


const getHeadlineUser = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		headline: 'dummy'
	}]})
}

const putHeadline = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		headline: req.body.headline
	}]})
}

const getEmailUser = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		email: 'dummy'
	}]})
}

const putEmail = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		email: req.body.email
	}]})
}

const getZipcodeUser = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		zipcode: 'dummy'
	}]})
}

const putZipcode = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		zipcode: req.body.zipcode
	}]})
}

const getAvatarUser = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		avatar: 'dummy'
	}]})
}

const putAvatar = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		avatar: req.body.avatar
	}]})
}

const getArticles = (req, res) => {
	let id = req.params.id;
	if (id) {
		if (id > 0 && id <= articles.articles.length) {
			res.send({articles: [articles.articles[id - 1]]})
		} else {
			res.send({articles: []})
		}  
	} else {
		res.send(articles)
	}
}

const postArticles = (req, res) => {
	num_articles += 1
	var text = req.body.text
	var newArticle = { id: num_articles, author: 'newAuthor', text: text}
	articles.articles.push(newArticle)
	res.send({articles: [newArticle]})
}



module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlineUser)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmailUser)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcodeUser)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatarUser)
     app.put('/avatar', putAvatar)
     app.get('/articles/:id*?', getArticles)
     app.post('/article', postArticles)
}
