import React from 'react'
import { connect } from 'react-redux'
import { login } from './authActions'
import { updateError, updateSuccess} from '../../actions'

const Login = ({dispatch}) => {

    let username, password

    return (
        <div className="col-sm-3 well well-lg">
            <p className="lead">Please Log In</p>
            <div className="input-group">
                <label htmlFor="text">Username: </label>
                <input type="text" className="form-control" ref={(node) => username = node} id="username"></input>
                <br></br>
                <label htmlFor="password">Password: </label>
                <input type="password" className="form-control" ref={(node) => password = node} id="password"></input>
                <br></br>
                <br></br>
                <br></br>
                <button type="button" className="btn btn-primary" id="logInButton" onClick={(e) => {  
                    e.preventDefault()  
                    if (username.value == '') {
                        dispatch(updateError('Please fill up the user name'))
                    } else if (password.value == '') {
                        dispatch(updateError('Please fill up the password'));
                    } else {
                        dispatch(login(username.value, password.value))
                    }
                }}>Log In</button>
            </div>
        </div>
    )
}

export default connect()(Login)

