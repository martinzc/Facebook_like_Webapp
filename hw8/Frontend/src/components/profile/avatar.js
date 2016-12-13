import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'

import { uploadAvatar, updateAvatar } from './profileActions'
import { resourceImg, updateError, updateSuccess, url } from '../../actions'

const Avatar = ({avatar, dispatch}) => {

    return (
        <div>
            <img src={avatar} alt="Profile Pic" id="profilePic"></img>
            <input type="file"  accept="image/*" onChange = {(e) => {
                const img = e.target.files[0]
                const fd = new FormData()
                fd.append('image', img)
                dispatch(uploadAvatar(fd))
            }}></input>
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
