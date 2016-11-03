"use strict"

const md5 = require('md5')

var cookieKey = 'sid'
var userInfo = {}
var sidToUser = {}


const register = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	var salt = Math.random()
	var hash = md5([username, salt].join(':'))
	userInfo[username] = {salt, hash}
	var msg = {username: username, result: "register success"}
	res.send(msg)
}

const login = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	var userObj = userInfo[username];
	if (!username) {
		res.sendStatus(400)
		return
	}
	var inSalt = userObj.salt;
	var inHash = md5([username, inSalt].join(':'))
	if (inHash != userObj.hash) {
		res.sendStatus(400)
		return
	}
	res.cookie(cookieKey, 12345, {maxAge: 3600*1000, httpOnly:true})
	sidToUser[12345] = username
	var msg = {username: username, result: "login success"}
	res.send(msg)
}


module.exports = app => {
     app.post('/register', register)
     app.post('/login', login)
}