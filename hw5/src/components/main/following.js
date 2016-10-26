import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const Follower = ({name, avatar, headline}) => (
    <div className="well well-sm" id="followedUser">
        <img src={avatar} alt="Profile Pic" id="profilePic"></img>
        <p className="text-primary">{name}</p>
        <small className="text-info" id="status">{headline}
            </small><br></br>
        <button type="button" className="btn btn-primary center-block" 
            id="unfollow">Unfollow</button>
    </div>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
}

const Following = ({followers}) => {
    return (
        <div>
        { Object.keys(followers).sort().map((f) => followers[f]).map((follower) =>
            <Follower key={follower.name}
                name={follower.name} avatar={follower.avatar} headline={follower.headline}/>
        )}
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
