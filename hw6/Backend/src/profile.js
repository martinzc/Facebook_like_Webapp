"use strict"

const profile = {
	user: 'test',
	headline: 'This is my headline!',
	email: 'foo@bar.com',
	zipcode: 12345,
	avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
	dob: 123456
}

const index = (req, res) => {
   res.send({ text: 'Welcome to the backend of Chao Zhou\'s Rice Book' })
}


// If id is provided, get information of the specific id's. 
// Return logged in user headline otherwise
const getHeadlineUser = (req, res) => {
	if (req.params.user) {
		let userLst = req.params.user.split(",")
		let returnLst = []
		userLst.forEach((userName) => {
			returnLst.push({
				username: userName,
				headline: profile.headline
			})
		})
		res.send({ headlines: returnLst})
	} else {
		res.send({ headlines: [{
			username: profile.user,
			headline: profile.headline
		}]})
	}
}

const putHeadline = (req, res) => {
	profile.headline = req.body.headline
	res.send({
		username: profile.user,
		headline: profile.headline
	})
}

const getHeadline = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		headline: req.body.headline
	}]})
}

// If id is provided, get information of the specific id's. 
// Return logged in user email otherwise
const getEmailUser = (req, res) => {
	if (req.params.user) {
		res.send({ 
			username: req.params.user, 
			email: profile.email
		})
	} else {
		res.send({ 
			username: profile.user, 
			email: profile.email
		})
	}
}

const putEmail = (req, res) => {
	profile.email = req.body.email
	res.send({ 
		username: profile.user,
		email: profile.email
	})
}

// If id is provided, get information of the specific id's. 
// Return logged in user zipcode otherwise
const getZipcodeUser = (req, res) => {
	if (req.params.user) {
		res.send({ 
			username: req.params.user, 
			zipcode: profile.zipcode
		})
	} else {
		res.send({ 
			username: profile.user, 
			zipcode: profile.zipcode
		})
	}
}

const putZipcode = (req, res) => {
	profile.zipcode = req.body.zipcode
	res.send({ 
		username: profile.user,
		zipcode: profile.zipcode
	})
}

// If id is provided, get information of the specific id's. 
// Return logged in user avatar otherwise
const getAvatarUser = (req, res) => {
	if (req.params.user) {
		res.send({ 
			username: req.params.user, 
			avatar: profile.avatar
		})
	} else {
		res.send({ 
			username: profile.user, 
			avatar: profile.avatar
		})
	}
}

const putAvatar = (req, res) => {
	profile.avatar = req.body.avatar
	res.send({ 
		username: profile.user,
		avatar: profile.avatar
	})
}

// Stub
const getDob = (req, res) => {
	res.send({ 
		username: profile.user,
		dob: profile.dob
	})
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlineUser)
     app.get('/headline/', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmailUser)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcodeUser)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatarUser)
     app.put('/avatar', putAvatar)
     app.get('/dob', getDob)
}
