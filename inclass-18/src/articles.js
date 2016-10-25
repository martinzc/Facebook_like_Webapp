
const express = require('express')
const bodyParser = require('body-parser')

var articles = [{ "id":1, "author":"Scott", "text":"This is my first article" }, { "id":2, "author":"Scott", "text":"This is my first article" }, { "id":3, "author":"Scott", "text":"This is my first article" }]

const addArticle = (req, res) => {  
     var newArticle = {"id":articles.length+1, "author":"newAuthor", "text": req.body.body} 
     articles.push(newArticle)
     res.send({newArticle : newArticle})
}

const getArticles = (req, res) => res.send({'articles' : articles})


const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles/:id*?', getArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
