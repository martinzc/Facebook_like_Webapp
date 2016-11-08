import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateFollower, deleteFollower } from './followingActions'

const Follower = ({name, avatar, headline, dispatch}) => (
    <div className="well well-sm" id="followedUser">
        <img src={avatar} alt="Profile Pic" id="profilePic"></img>
        <p className="text-primary">{name}</p>
        <small className="text-info" id="status">{headline}
            </small><br></br>
        <button type="button" className="btn btn-primary center-block" 
            id="unfollow" onClick={() => {  
                dispatch(deleteFollower(name))
            }}>Unfollow</button>
    </div>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
}

const Following = ({followers, dispatch}) => {
    let newFollowUser
    return (
        <div>
        <div>
          <input className="form-control" type="text" placeholder="user ID"
            ref={(node) => newFollowUser = node }/>
          <button type="button" className="btn btn-primary center-block" onClick={() => {  
            if (newFollowUser.value != '') {
              dispatch(updateFollower(newFollowUser.value))
              newFollowUser.value = ''
            }
          }}>Follow</button>
          <br></br>
        </div>
        <div>
        { Object.keys(followers).sort().map((f) => followers[f]).map((follower) =>
            <Follower key={follower.name}
                name={follower.name} avatar={follower.avatar} headline={follower.headline} dispatch={dispatch}/>
        )}
        </div>
        </div>
    )
}

Following.propTypes = {
    followers: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            followers: state.followers.followers
        }
    }
)(Following)
