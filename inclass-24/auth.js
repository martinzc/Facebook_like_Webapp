"use strict"

var redis = require('redis').createClient('redis://h:pdgkn7cikjlp1i2437ot7o4kuq3@ec2-54-221-251-36.compute-1.amazonaws.com:10989')
var sid = "session id"
var userObj = {name: "test user", password: "password"}

const register = (req, res) => {
	res.send({ result: "success", username:"test user"})
}

const login = (req, res) => {
	redis.hmset(sid, userObj)
	redis.hgetall(sid, function(err, userObj) {
		console.log(sid + ' mapped to ' + userObj)
	})
	res.send({ username: "test user", result: "success"})
}

const logout = (req, res) => {
	res.send("OK")
}

const changePw = (req, res) => {
	res.send({ username: "test user", status: "will not change"})
}


module.exports = app => {
     app.post('/register', register)
     app.post('/login', login) 
     app.put('/logout', logout)
     app.put('/password', changePw)
}