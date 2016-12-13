"use strict"

const models = require('./models.js')
const md5 = require('md5')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const session = require('express-session')
const redis = require('redis').createClient(
	"redis://h:puc58kb05pdbbdnkup3nm97htv@ec2-54-225-80-250.compute-1.amazonaws.com:24639"
)
const config = {
	clientID: '452251020439-e0e196l6brtra1p5btuahl3r64m33sar.apps.googleusercontent.com',
	clientSecret: '-_4CDj9ag9u3v_LhU1VHLQox',
	// callbackURL: 'http://localhost:4000/callback'
	callbackURL: 'https://ricebookapphw8.herokuapp.com/callback'
}
// const frontEndUrl = 'http://localhost:3000/index.html'
const frontEndUrl = 'http://oceanic-party.surge.sh'
const User = models.User
const Profiles = models.Profiles
var authUserName, authUserEmail, authUserPhoto;

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
		googleEmail: undefined,
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
	   // This sets the key-value pair (sid, userObj)
		redis.hmset(sessionKey, userObj)
	   // this sets a cookie
	   res.cookie("sessionId", sessionKey, { maxAge: 3600*1000, httpOnly: true})
	   let scope;
	   if (userObj.googleEmail) {
	   	scope = 'merged'
	   	res.cookie("scope", 'merged', { maxAge: 3600*1000, httpOnly: true})
	   } else {
	   	scope = 'local'
	   	res.cookie("scope", 'local', { maxAge: 3600*1000, httpOnly: true})
	   }
		var payload = {name: req.body.username}
		res.send({ username: userObj.username, scope: scope, result: "success"})
	});
}

const linkLocal = (req, res) => {
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
		User.findOne({ username: req.user }, function(err, oldUser) {
			userObj.googleEmail = oldUser.googleEmail
			userObj.save()
   		User.find({ username: req.user }).remove().exec();
		})
		Profiles.findOne({ username: req.user }, function(err, oldProfile) {
			Profiles.findOne({ username: req.body.username}, function(err, profileObj) {
				profileObj.picture = oldProfile.picture 
				profileObj.save()
   			Profiles.find({ username: req.user }).remove().exec();
			})
		})
		redis.del(req.cookies['sessionId'])
		res.clearCookie("sessionId")
		res.clearCookie("scope")
		// "security by obscurity" we don't want people guessing a sessionkey
	   const sessionKey = md5("mySecretMessage" + new Date().getTime() + userObj.username)
	   // This sets the key-value pair (sid, userObj)
		redis.hmset(sessionKey, userObj)
	   // this sets a cookie
	   res.cookie("sessionId", sessionKey, { maxAge: 3600*1000, httpOnly: true})
   	res.cookie("scope", 'merged', { maxAge: 3600*1000, httpOnly: true})
		var payload = {name: req.body.username}
		res.send({ username: userObj.username, scope: 'merged', result: "success"})
	});
}

const auth = (req, res) => {
	res.send({ username: req.user, scope: req.scope })
}

const profile = (req, res) => {
	if (req.cookies['sessionId']) {
		redis.hgetall(req.cookies['sessionId'], function(err, userObj) {
		   if (!userObj) {
		   	res.sendStatus(401)
		   	return
		   }
		   User.findOne({ username: userObj.username }, function(err, targetUser) {
		   	User.find({ googleEmail: authUserEmail }).remove().exec();
		   	Profiles.find({ username: authUserName }).remove().exec();
		   	targetUser.googleEmail = authUserEmail
		   	Profiles.findOne( {username: targetUser.username},  function(err, targetProfile) {
		   		targetProfile.picture = authUserPhoto
		   		targetProfile.save()
		   	})
		   	targetUser.save()
		   })
			res.clearCookie("scope")
			res.cookie("scope", 'merged', { maxAge: 3600*1000, httpOnly: true})
			res.redirect(frontEndUrl);
		})
	} else {
		User.findOne({ googleEmail: authUserEmail }, function(err, userObj) {
			// check if the userObj is found
			if (!userObj) {	
				var newUser = new User({
					username: authUserName,
					googleEmail: authUserEmail,
					salt: '',
					hash: ''
				})
				var newProfile = new Profiles({
					username: authUserName,
					status: "empty",
					picture: authUserPhoto,
					following: [],
					email: authUserEmail,
					zipcode: '',
					dob: ''
				})
				newUser.save();
				newProfile.save();
				// "security by obscurity" we don't want people guessing a sessionkey
			   const sessionKey = md5("mySecretMessage" + new Date().getTime() + authUserName)
			   // This sets the key-value pair (sid, userObj)
				redis.hmset(sessionKey, newUser)
			   // this sets a cookie
			   res.cookie("sessionId", sessionKey, { maxAge: 3600*1000, httpOnly: true})
			   res.cookie("scope", 'google', { maxAge: 3600*1000, httpOnly: true})
				res.redirect(frontEndUrl);
			} else {
				// "security by obscurity" we don't want people guessing a sessionkey
			   const sessionKey = md5("mySecretMessage" + new Date().getTime() + authUserName)
			   // This sets the key-value pair (sid, userObj)
				redis.hmset(sessionKey, userObj)
			   // this sets a cookie
			   res.cookie("sessionId", sessionKey, { maxAge: 3600*1000, httpOnly: true})
			   if (userObj.salt != '') {
			   	res.cookie("scope", 'merged', { maxAge: 3600*1000, httpOnly: true})
			   } else {
			   	res.cookie("scope", 'google', { maxAge: 3600*1000, httpOnly: true})
			   }
				res.redirect(frontEndUrl);
			}
		});
	}
}

const fail = (req, res) => {
	res.send('Fail to log in with google')
}

const logout = (req, res) => {
	if (!req.cookies) {
		res.sendStatus(401)
		return
	}
	redis.del(req.cookies['sessionId'])
	res.clearCookie("sessionId")
	res.clearCookie("scope")
	res.send("OK")
}

const unlink = (req, res) => {
	User.findOne({ username: req.user }, function(err, userObj) {
		userObj.googleEmail = undefined
		Profiles.findOne({ username: req.user }, function(err, profileObj) {
			profileObj.picture = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
			profileObj.save();
		});
		userObj.save()
		res.clearCookie("scope")
		res.cookie("scope", 'local', { maxAge: 3600*1000, httpOnly: true})
		res.send("OK")
	});
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
	if (req.cookies['sessionId']) {
		redis.hgetall(req.cookies['sessionId'], function(err, userObj) {
		   if (!userObj) {
		   	res.sendStatus(401)
		   	return
		   }
		   req.scope = req.cookies['scope']
		   req.user = userObj.username
		   return next()
		})
	} else {
		res.sendStatus(401)
		return
	}
}

passport.serializeUser(function(user, done) {
	done(null, user)
})

passport.deserializeUser(function(user, done) {
	done(null, user)
})

passport.use(new GoogleStrategy(config, function(accessToken, refreshToken, profile, done) {
	authUserEmail = profile.emails[0].value
	authUserName = profile.id
	authUserPhoto = profile.photos[0].value
	return done(null, profile)
}))

module.exports = {
	app: app => {
		app.use(passport.initialize())
		app.use(passport.session())
		app.use(session({secret: '-_4CDj9ag9u3v_LhU1VHLQox'}))
	   app.post('/register', register)
	   app.post('/login', login)
	   app.post('/linkLocal', isLoggedIn, linkLocal)
	   app.get('/authenticate', auth) 
	   app.use('/googleLogin', passport.authenticate('google', { scope: 'email'}))
	   app.use('/callback', passport.authenticate('google', {
	   	successRedirect: '/profile', failureRedirect: '/fail'
	   }))
	   app.use('/profile', profile)
	   app.use('/fail', fail)
	   app.put('/logout', isLoggedIn, logout)
	   app.put('/unlink', isLoggedIn, unlink)
	   app.put('/password', isLoggedIn, changePw)
	},
	isLoggedIn
}