"use strict"

var num_articles = 3
var articles = { articles: [ 
	{ id: 1, author: 'Scott', text: 'article1', comments: [], date: new Date()}, 
	{ id: 2, author: 'LALA', text: 'article2', comments: [], date: new Date()},
	{ id: 3, author: 'MOMO', text: 'article3', comments: [], date: new Date()}] 
}

// If id is provided, get information of the specific id's. Return all articles otherwise
const getArticles = (req, res) => {
	let id = req.params.id;
	if (id) {
		if (id > 0 && id <= articles.articles.length) {
			res.send({articles: [articles.articles[id - 1]]})
		} else {
			res.send("Article not found")
		}  
	} else {
		res.send(articles)
	}
}

const postArticles = (req, res) => {
	num_articles += 1
	var text = req.body.text
	var newArticle = { id: num_articles, author: 'newAuthor', text: text, comments: []}
	articles.articles.push(newArticle)
	res.send({articles: [newArticle]})
}

const putArticles = (req, res) => {
	res.send({articles: [{id: 1, author: "Scott", text: "Put Stub", comments: []}]})
}

module.exports = app => {
     app.get('/articles/:id*?', getArticles)
     app.put('/articles/:id*?', putArticles)
     app.post('/article', postArticles)
}
