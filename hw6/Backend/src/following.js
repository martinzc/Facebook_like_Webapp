"use strict"

const getFollowing = (req, res) => {
	res.send({ username: "testUser", following: ["cz16"] })
}

const putFollowing = (req, res) => {
	res.send({ username: "testUser", following: ["cz16"] })
}

const postFollowing = (req, res) => {
	res.send({ username: "testUser", following: ["cz16"] })
}




module.exports = app => {
     app.get('/following', getFollowing)
     app.put('/following', putFollowing)
     app.delete('/following', postFollowing)
}
