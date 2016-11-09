import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'


let ErrorMessage = ({error, success}) => (
    <div className="row">
        { error == '' ? '' :
            <div className="alert alert-danger">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">{ error }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
        { success == '' ? '' :
            <div className="alert alert-success">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="successMsg">{ success }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
    </div>
)

ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}
ErrorMessage = connect((state) => {
    return { error: state.error.error, success: state.error.success }
})(ErrorMessage)

const Profile = () => {
    return (
        <div>
        		<ErrorMessage/>
        		<div><br></br><br></br><br></br></div>
        		<div className="col-sm-1"></div>
            <Avatar/>
        		<div className="col-sm-2"></div>
            <ProfileForm/>
        </div>
    )
}
export default Profile