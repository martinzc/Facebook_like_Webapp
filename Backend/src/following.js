"use strict"

const models = require('./models.js')
var isLoggedIn = require('./auth').isLoggedIn
const Profiles = models.Profiles

const getFollowing = (req, res) => {
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
    let followingList = []
    profileObj.following.forEach(function(element) {
      followingList.push(element)
    })
    res.send({ 
      username: profileObj.username, 
      following: followingList
    })
  })
  return 
}

const putFollowing = (req, res) => {
  const newFollow = req.params.user
  Profiles.findOne({ username: req.user }, 
    function(err, profileObj) {
    // check if the article is found
    if (!profileObj) {
      res.sendStatus(400)
      return
    }
    if (profileObj.following.indexOf(newFollow) == -1) {
      Profiles.find({username:newFollow}, function (err, elements) {
          if (elements.length) {
            profileObj.following.push(newFollow)
            profileObj.save()
            res.send({ username: profileObj.username, following: profileObj.following })
            return
          } else {
            res.sendStatus(400)
            return
          }
      });
    } else {      
      res.sendStatus(400)
      return
    }
  })
}

const deleteFollowing = (req, res) => {
  const deleteFollow = req.params.user
  Profiles.findOne({ username: req.user }, 
    function(err, profileObj) {
    // check if the article is found
    if (!profileObj) {
      res.sendStatus(400)
      return
    }
    var remIndex = profileObj.following.indexOf(deleteFollow)
    if (remIndex > -1) {
      profileObj.following.splice(remIndex, 1);
      profileObj.save()
      res.send({ username: profileObj.username, following: profileObj.following })
      return
    } else {      
      res.sendStatus(400)
      return
    }
  })
}

module.exports = app => {
     app.get('/following/:user?', isLoggedIn, getFollowing)
     app.put('/following/:user', isLoggedIn, putFollowing)
     app.delete('/following/:user', isLoggedIn, deleteFollowing)
}
