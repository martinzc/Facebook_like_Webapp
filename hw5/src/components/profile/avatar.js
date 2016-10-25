import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadImage } from './profileActions'

const Avatar = ({avatar}) => {

    return (
        <div className="col-sm-3">
            <img src={avatar} alt="Profile Pic" id="profilePic"></img>
            <input type="file"  accept="image/*"></input>
            <button type="button" className="btn btn-default">Update Profile Pic</button>
        </div>
    )
}

Avatar.PropTypes = {
    avatar: PropTypes.string
}

export default connect(
    (state) => {
        return {
            avatar: state.profile.avatar
        }
    }
)(Avatar)
