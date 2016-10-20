
const index = (req, res) => {
   res.send({ hello: 'world' })
}


const getHeadlineUser = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		headline: 'dummy'
	}]})
}

const putHeadline = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		headline: req.body.headline
	}]})
}

const getEmailUser = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		email: 'dummy'
	}]})
}

const putEmail = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		email: req.body.email
	}]})
}

const getZipcodeUser = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		zipcode: 'dummy'
	}]})
}

const putZipcode = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		zipcode: req.body.zipcode
	}]})
}

const getAvatarUser = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		avatar: 'dummy'
	}]})
}

const putAvatar = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		avatar: req.body.avatar
	}]})
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlineUser)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmailUser)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcodeUser)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatarUser)
     app.put('/avatar', putAvatar)
}
