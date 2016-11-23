"use strict"

const models = require('./models.js')
var isLoggedIn = require('./auth').isLoggedIn
const Profiles = models.Profiles

const index = (req, res) => {
   res.send({ text: 'Welcome to the backend of Chao Zhou\'s Rice Book' })
}

const uploadImage = require('./uploadCloudinary')

const getHeadlineUser = (req, res) => {
	if (req.params.user) {
		let userLst = req.params.user.split(",")
		let returnLst = []
		let promiseLst = []
		userLst.forEach((userName) => {
			promiseLst.push(Profiles.findOne({ username: userName }, 
				function(err, profileObj) {
				// check if the article is found
				if (!profileObj) {
					res.sendStatus(400)
					return
				}
				returnLst.push({
					username: profileObj.username,
					headline: profileObj.status
				})
			}))
		})
		Promise.all(promiseLst).then(values => {
			res.send({ headlines: returnLst})
		})
		return 
	} else {
		Profiles.findOne({ username: req.user }, 
			function(err, profileObj) {
			// check if the article is found
			if (!profileObj) {
				res.sendStatus(400)
				return
			}
			let returnLst = []
			returnLst.push({
				username: profileObj.username,
				headline: profileObj.status
			})
			res.send({ headlines: returnLst})
			return
		});
	}
}

const putHeadline = (req, res) => {
	Profiles.findOne({ username: req.user }, 
		function(err, profileObj) {
		// check if the article is found
		if (!profileObj) {
			res.sendStatus(400)
			return
		}
		let returnLst = []
		profileObj.status = req.body.headline
		profileObj.save();
		returnLst.push({
			username: profileObj.username,
			headline: profileObj.status
		})
		res.send({ headlines: returnLst})
		return
	});
	return
}

const getEmailUser = (req, res) => {
	var username = req.user
	if (req.params.user) {
		username = req.params.user
	}
	Profiles.findOne({ username: username }, 
		function(err, profileObj) {
		// check if the article is found
		if (!profileObj) {
			res.sendStatus(400)
			return
		}
		res.send({ 
			username: profileObj.username, 
			email: profileObj.email
		})
	})
	return 
}

const putEmail = (req, res) => {
	Profiles.findOne({ username: req.user }, 
		function(err, profileObj) {
		// check if the article is found
		if (!profileObj) {
			res.sendStatus(400)
			return
		}
		profileObj.email = req.body.email
		profileObj.save();
		res.send({ 
			username: profileObj.username, 
			email: profileObj.email
		})
	})
	return 
}

const getZipcodeUser = (req, res) => {
	var username = req.user
	if (req.params.user) {
		username = req.params.user
	}
	Profiles.findOne({ username: username }, 
		function(err, profileObj) {
		// check if the article is found
		if (!profileObj) {
			res.sendStatus(400)
			return
		}
		res.send({ 
			username: profileObj.username, 
			zipcode: profileObj.zipcode
		})
	})
	return 
}

const putZipcode = (req, res) => {
	Profiles.findOne({ username: req.user }, 
		function(err, profileObj) {
		// check if the article is found
		if (!profileObj) {
			res.sendStatus(400)
			return
		}
		profileObj.zipcode = req.body.zipcode
		profileObj.save();
		res.send({ 
			username: profileObj.username, 
			zipcode: profileObj.zipcode
		})
	})
	return 
}

const getAvatarUser = (req, res) => {
	if (req.params.user) {
		let userLst = req.params.user.split(",")
		let returnLst = []
		let promiseLst = []
		userLst.forEach((userName) => {
			promiseLst.push(Profiles.findOne({ username: userName }, 
				function(err, profileObj) {
				// check if the article is found
				if (!profileObj) {
					res.sendStatus(400)
					return
				}
				returnLst.push({
					username: profileObj.username,
					avatar: profileObj.picture
				})
			}))
		})
		Promise.all(promiseLst).then(values => {
			res.send({ avatars: returnLst})
		})
		return 
	} else {
		Profiles.findOne({ username: req.user }, 
			function(err, profileObj) {
			// check if the article is found
			if (!profileObj) {
				res.sendStatus(400)
				return
			}
			let returnLst = []
			returnLst.push({
				username: profileObj.username,
				avatar: profileObj.picture
			})
			res.send({ avatars: returnLst})
			return
		});
	}
}

const putAvatar = (req, res) => {
	res.send({ 
		username: "not working",
		avatar: "not working",
		publicId: "not working"
	})
}

const getDob = (req, res) => {
	var username = req.user
	if (req.params.user) {
		username = req.params.user
	}
	Profiles.findOne({ username: username }, 
		function(err, profileObj) {
		// check if the article is found
		if (!profileObj) {
			res.sendStatus(400)
			return
		}
		res.send({ 
			username: profileObj.username, 
			dob: profileObj.dob
		})
	})
}


module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', isLoggedIn, getHeadlineUser)
     app.put('/headline', isLoggedIn, putHeadline)
     app.get('/email/:user?', isLoggedIn, getEmailUser)
     app.put('/email', isLoggedIn, putEmail)
     app.get('/zipcode/:user?', isLoggedIn, getZipcodeUser)
     app.put('/zipcode', isLoggedIn, putZipcode)
     app.get('/avatars/:user?', isLoggedIn, getAvatarUser)
     app.put('/avatar', isLoggedIn, uploadImage('avatar'), putAvatar)
     app.get('/dob', isLoggedIn, getDob)
}
