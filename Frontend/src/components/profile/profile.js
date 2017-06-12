import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'
import { login, googleLogin, unlink, linkLocal } from '../auth/authActions'


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

const Profile = ({scope, dispatch}) => {
    let username, password
    return (
        <div>
            <div className='row'>
    		  <ErrorMessage/>
            </div>
            <div className='row'>
        		<div className="col-sm-1"></div>
                <div className="col-sm-4">
                    <div className='row'>
                        <Avatar/>
                    </div>
                  {
                    scope != 'local' ? '' : 
                    <div className='row'>
                        <button type="button" className="btn btn-primary btn-block" onClick={(e) => {  
                            e.preventDefault()
                            dispatch(googleLogin())
                        }}>Link Google Account</button>
                    </div>
                  }
                  {
                    scope != 'merged' ? '' : 
                    <div className='row'>
                        <button type="button" className="btn btn-primary btn-block" onClick={(e) => {  
                            e.preventDefault()
                            dispatch(unlink())
                        }}>Unlink</button>
                    </div>
                  }
                  {
                    scope != 'google' ? '' : 
                    <div className='row'>
                        <label htmlFor="text">Username: </label>
                        <input type="text" className="form-control" ref={(node) => username = node} id="username">
                        </input>
                        <br></br>
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="form-control" ref={(node) => password = node} id="password">
                        </input>
                        <button type="button" className="btn btn-primary btn-block" onClick={(e) => {  
                            e.preventDefault()  
                            if (username.value == '') {
                                dispatch(updateError('Please fill up the user name'))
                            } else if (password.value == '') {
                                dispatch(updateError('Please fill up the password'));
                            } else {
                                dispatch(linkLocal(username.value, password.value))
                            }
                        }}>Link Local Account</button>
                    </div>
                  }
                </div>
        		<div className="col-sm-2"></div>
                <ProfileForm/>
            </div>
        </div>
    )
}


Profile.PropTypes = {
    scope: PropTypes.string
}

export default connect(
    (state) => {
        return {
            scope: state.profile.scope
        }
    }
)(Profile)