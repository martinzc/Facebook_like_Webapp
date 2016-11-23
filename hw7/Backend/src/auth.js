"use strict"

const models = require('./models.js')
const md5 = require('md5')

const User = models.User
const Profiles = models.Profiles
const sessionUser = {}

const register = (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	// hash the password
	var salt = Math.random()
	var hash = md5([password, salt].join(':'))
	var newUser = new User({
		username: username,
		salt: salt,
		hash: hash
	})
	var newProfile = new Profiles({
		username: username,
		status: "empty",
		picture: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
		following: [],
		email: req.body.email,
		zipcode: req.body.zipcode,
		dob: req.body.dob
	})
	newUser.save();
	newProfile.save();
	var msg = {username: username, result: "register success"}
	res.send(msg)
}

const login = (req, res) => {
	User.findOne({ username: req.body.username }, function(err, userObj) {
		// check if the userObj is found
		if (!userObj) {
			res.sendStatus(401)
			return
		}
		// check if the password matches based on hash value
		var hash = md5([req.body.password, userObj.salt].join(':'))
		if (hash != userObj.hash) {
			res.sendStatus(401)
			return
		}
		// "security by obscurity" we don't want people guessing a sessionkey
	   const sessionKey = md5("mySecretMessage" + new Date().getTime() + userObj.username)
	   sessionUser[sessionKey] = userObj.username
	   // this sets a cookie
	   res.cookie("sessionId", sessionKey, { maxAge: 3600*1000, httpOnly: true})
		var payload = {name: req.body.username}
		res.send({ username: userObj.username, result: "success"})
	});
}

const logout = (req, res) => {
	if (!req.cookies) {
		res.sendStatus(400)
		return
	}
	delete sessionUser[req.cookies['sessionId']]
	res.clearCookie("sessionId")
	res.send("OK")
}

const changePw = (req, res) => {
	User.findOne({ username: req.user }, function(err, userObj) {
		// check if the userObj is found
		if (!userObj) {
			res.sendStatus(401)
			return
		}
		var salt = Math.random()
		var hash = md5([req.body.password, salt].join(':'))
		userObj.salt = salt;
		userObj.hash = hash;
		userObj.save()
		res.send({ username: userObj.username, status: "changed"})
		return
	});
}

function isLoggedIn(req, res, next) {
   req.user = sessionUser[req.cookies['sessionId']]
   if (!req.user) {
   	res.sendStatus(401)
   	return
   }
   return next()
}

module.exports = {
	app: app => {
	   app.post('/register', register)
	   app.post('/login', login) 
	   app.put('/logout', isLoggedIn, logout)
	   app.put('/password', isLoggedIn, changePw)
	},
	isLoggedIn
}