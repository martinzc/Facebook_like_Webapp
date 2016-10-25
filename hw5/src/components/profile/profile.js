import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'

const Profile = () => {
    return (
        <div>
            <Avatar/>
            <div className="col-xs-5 col-md-5">
                <ProfileForm/>
            </div>
        </div>
    )
}
export default Profile