
const express = require('express')
const bodyParser = require('body-parser')

var articles = [{ "id":1, "author":"Scott", "text":"This is my first article" }, { "id":2, "author":"Scott", "text":"This is my first article" }, { "id":3, "author":"Scott", "text":"This is my first article" }]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)   
     var newArticle = {"id":articles.length+1, "author":"newAuthor", "text": req.body.body} 
     res.send(newArticle)
     articles.push(newArticle)
}

const getArticles = (req, res) => {
	console.log(articles)
	articles.forEach((iterate) => {
     console.log('Payload received', iterate) 
	})
	res.send(articles)
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
