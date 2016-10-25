import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateHeadline } from '../profile/profileActions'

const Headline = ({ username, avatar, headline, dispatch}) => {
    let newHeadline
    return (
        <div>
            <img src={avatar} alt="Profile Pic" id="profilePic"></img>
            <p className="text-primary" id="username">{ username }</p>
            <small className="text-info" id="status">Status: <br/>{ headline }</small>
            <textarea className="form-control" rows="2" id="updateStatus" 
                placeholder="Update your status" ref={ (node) => { newHeadline = node }}></textarea>
            <button type="button" className="btn btn-primary center-block" 
                id="updateStatusBotton" onClick={() => {
                            dispatch(updateHeadline(newHeadline.value))
                            newHeadline.value = ''
                        }}>Update</button>
        </div>
    )
}


Headline.PropTypes = {
    username: PropTypes.string,
    avatar: PropTypes.string,
    headline: PropTypes.string
}

export default connect(
    (state) => {
        return {
            username: state.profile.username,
            avatar: state.profile.avatar,
            headline: state.profile.headline
        }
    }
)(Headline)