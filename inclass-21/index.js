"use strict"

const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const app = express()
app.use(bodyParser.json())
require('./profile')(app)
require('./auth')(app)
app.use(cookieParser())

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
