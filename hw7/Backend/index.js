"use strict"

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const enableCORS = (req, res, next) => {
	if (req.headers.origin) {
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
	}
	res.setHeader('Access-Control-Allow-Credentials', true)
	res.setHeader('Credentials', true)
	res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization, x-reqested-with, x-session-id')

	if (req.methods == "OPTIONS") {
		res.send(200)
	} else {
		next()
	}
}
app.use(bodyParser.json())
app.use(cookieParser());
app.use(enableCORS);
require('./src/profile')(app)
require('./src/auth').app(app)
require('./src/articles')(app)
require('./src/following')(app)



// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 8080
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
