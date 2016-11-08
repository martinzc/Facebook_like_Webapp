"use strict"

const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const app = express()
app.use(bodyParser.json())
require('./src/profile')(app)
require('./src/auth')(app)
// require('./src/articles')(app)
// require('./src/following')(app)
app.use(cookieParser())

app.use(function (req, res, next) {
	req.headers['Access-Control-Allow-Origin'] = req.headers.origin
	req.headers['Access-Control-Allow-Credentials '] = true 
	req.headers['access-control-request-method'] = 'PUT, POST, GET'
	req.headers['access-control-request-headers'] = 'content-type, authorization'
})

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
