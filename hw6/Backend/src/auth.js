"use strict"

const register = (req, res) => {
	res.send({ result: "success", username:"test user"})
}

const login = (req, res) => {
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