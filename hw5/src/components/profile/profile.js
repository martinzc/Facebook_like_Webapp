import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'

const Profile = () => {
    return (
        <div>
        		<div><br></br><br></br><br></br></div>
        		<div className="col-sm-1"></div>
            <Avatar/>
        		<div className="col-sm-2"></div>
            <ProfileForm/>
        </div>
    )
}
export default Profile