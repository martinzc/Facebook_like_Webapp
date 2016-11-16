"use strict"

var redis = require('redis').createClient('redis://h:pdgkn7cikjlp1i2437ot7o4kuq3@ec2-54-221-251-36.compute-1.amazonaws.com:10989')
var sid = "session id"

const register = (req, res) => {
	res.send({ result: "success", username:"test user"})
}

const login = (req, res) => {
	console.log(isLoggedIn(req))
	if (isLoggedIn(req)) {
		console.log("user is logged in already")
	} else {
		var payload = {name: req.body.username}
		redis.hmset(sid, {"name": req.body.username})
	}
	res.send({ username: "test user", result: "success"})
}

const logout = (req, res) => {
	res.send("OK")
}

const changePw = (req, res) => {
	res.send({ username: "test user", status: "will not change"})
}

function isLoggedIn(req) {
	let bool = false
	redis.hgetall(sid, function(err, userObj) {
		if (userObj.name == req.body.username) {
			bool = true
		}
	})
	return false
}


module.exports = app => {
     app.post('/register', register)
     app.post('/login', login) 
     app.put('/logout', logout)
     app.put('/password', changePw)
}