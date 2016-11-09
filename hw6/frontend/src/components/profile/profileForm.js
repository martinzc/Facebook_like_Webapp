import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateProfile } from './profileActions'
import { changeInfo } from '../auth/authActions'

import moment from 'moment'


const ProfileForm = ({oldEmail, oldZipcode, oldPw, oldDob, dispatch}) => {

    let email, zipCode, pw, pwConf, birthday

    const date = moment(new Date(oldDob))

    return (
        <div className="col-sm-2">
            <p>Email Address: 
            <br></br>
            <small>Must be the format x@x.xx</small>
            <br></br>
            <input type="text" id="email" 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}"
                ref={ (node) => { email = node }}
                placeholder={oldEmail}></input>
            </p>
            <p>Zipcode:
            <br></br>
            <small>Must be 5-digit number</small>
            <br></br>
            <input type="text" id="zipCode" name="inputVal" pattern="\d{5}"
                ref={ (node) => { zipCode = node }}
                placeholder={oldZipcode}></input>
            </p>
            <p>Date Of Birth:<br></br>
            <small>Current DOB: {date.format('YYYY-MM-DD')}</small>
            <br></br>
            <input type="date" className="form-control"
                ref={(node) => birthday = node} ></input>
            </p>
            <p>Password: 
            <br></br>
            <input type="password" id="password" name="inputVal"
                ref={ (node) => { pw = node }}></input>
            </p>
            <p>Password Confirmation: 
            <br></br>
            <input type="password" id="passwordConfirmation" name="inputVal"
                ref={ (node) => { pwConf = node }}></input>
            </p>
            <button id="changeBtn" type="submit" className="btn btn-primary" onClick={(e) => {  
                e.preventDefault();
                const payload = {
                    email: email.value, 
                    zipcode: zipCode.value, 
                    password: pw.value, 
                    pwConf: pwConf.value
                }
                dispatch(changeInfo(payload))
                email.value = ""
                zipCode.value = ""
                pw.value = ""
                pwConf.value = ""
            }}>Change Profile Info</button>
        </div>
    )
}

ProfileForm.PropTypes = {
    oldEmail: PropTypes.string,
    oldZipcode: PropTypes.string,
    oldPw: PropTypes.string,
    oldDob: PropTypes.string
}


export default connect(
    (state) => {
        return {
            oldEmail: state.profile.email,
            oldZipcode: state.profile.zipcode,
            oldPw: state.profile.password,
            oldDob: state.profile.dob
        }
    }
)(ProfileForm)