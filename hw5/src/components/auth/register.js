import React from 'react'
import { connect } from 'react-redux'
import { updateError, updateSuccess} from '../../actions'
// import { register } from './authActions'

const Register = ({dispatch}) => {

    let username, displayName, email, telephone, birthday, zipCode, password, passwordConfirmation

    return (
        <div className="col-sm-8 form-group well well-lg">
            <p className="lead">New User? Register here.</p>
            <form id="usrform" method="get" action="main.html" 
                onSubmit={(e) => {
                e.preventDefault()
                if (password.value != passwordConfirmation.value) {
                    dispatch(updateError('Please match the two passwords'));
                } else {
                    const payload = {
                        username:username.value,
                        displayName:displayName.value,
                        email:email.value,
                        telephone:telephone.value,
                        birthday:birthday.value,
                        zipcode:zipcode.value,
                        password:password.value,
                        passwordConfirmation:passwordConfirmation.value
                    }
                    // dispatch(register(payload))
                }
            }}>
            <input type="hidden" name="timeStamp"></input>
            <label htmlFor="text">Username: </label>
            <input type="text" className="form-control" 
                placeholder="Only letters and numbers. Start with letters" 
                pattern="([A-Za-z]){1}([A-Za-z0-9])*"  
                ref={(node) => username = node} required></input>
            <label htmlFor="text">Display Name (Optional): </label>
            <input type="text" className="form-control" 
                pattern="([A-Za-z0-9])*"
                ref={(node) => displayName = node}></input>
            <label htmlFor="text">Email Address: </label>
            <input type="text" className="form-control" 
                placeholder="x@x.xx" 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}" 
                ref={(node) => email = node} required></input>
            <label htmlFor="text">Phone Number: </label>
            <input type="text" className="form-control" 
                pattern="\d{3}-\d{3}-\d{4}" placeholder="xxx-xxx-xxxx"
                ref={(node) => telephone = node} required></input>
            <label htmlFor="text">Date Of Birth: </label>
            <input type="date" className="form-control"
                ref={(node) => birthday = node} required></input>
            <label htmlFor="text">Zipcode: </label>
            <input type="text" className="form-control" 
                pattern="\d{5}" placeholder="xxxxx"
                ref={(node) => zipCode = node} required></input>
            <label htmlFor="text">Password: </label>
            <input type="password" className="form-control"
                ref={(node) => password = node} required></input>
            <label htmlFor="text">Password Confirmation: </label>
            <input type="password" className="form-control"
                ref={(node) => passwordConfirmation = node} required></input>
            <br></br>
            <div id="signUpButton">
            <input type="submit" className="btn btn-primary" value="Submit"></input>
            <input type="reset" className="btn btn-danger" value="Clear"></input>
            </div>
            </form>
        </div>
    )
}

export default connect()(Register)
