import { resource, updateError, updateSuccess, navToProfile, navToMain, navToLanding, clearInfo } from '../../actions'
import {fetchProfile} from '../profile/profileActions'
import {fetchFollowers} from '../main/followingActions'
import {fetchArticles} from '../article/articleActions'


export function initialVisit() {
    return (dispatch) => {
        // try to log in
        resource('GET', 'headlines').then((response) => {
            dispatch(updateInfo(response.headlines[0].username, "dummy"))
            dispatch(fetchProfile())
            dispatch(fetchFollowers())
            dispatch(fetchArticles())
            dispatch(navToMain())
        }).catch((err) => {
        })
    }
}

const updateInfo = (username, password) => {return { type:"LOGIN", username, password}}


export function login(username, password) {
    return (dispatch) => {
        resource('POST', 'login', { username, password })
        .then((response) => {
            dispatch(updateInfo(username, password))
            dispatch(initialVisit())
        }).catch((err) => {
            dispatch(updateError(`There was an error logging in as \'${username}\'`))
        })
    }
}

export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
        .then((response) => {
            dispatch(clearInfo())
            dispatch(navToLanding())
        })
        .catch((err) => {
            dispatch(updateError(`There was an error logging out`))
        })
    }
}

export function register({username, email, dob, zipcode, password}) {
    return (dispatch) => {
        resource('POST', 'register', { username, email, dob, zipcode, password })
        .then((response) => {
            document.getElementById("usrform").reset();
            dispatch(updateSuccess(`Successfully registered as ` + username))
        }).catch((err) => {
            dispatch(updateError(`There was an error registering as ` + username))
        })
    }
}

export function changeInfo({email, zipcode, password, pwConf}) {
    return (dispatch) => {
        if (zipcode != '') {
            if (/^\d{5}$/.test(zipcode)) {
                resource('PUT', 'zipcode', { zipcode })
                .then((response) => {
                    dispatch(fetchProfile())
                }).catch((err) => {
                    dispatch(updateError("Error updating zipcode. "))
                })
            } else {
                dispatch(updateError("Zipcode wrong format. "))
            }
        }
        if (email != '') {
            if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$/.test(email)) {
                resource('PUT', 'email', { email })
                .then((response) => {
                    dispatch(fetchProfile())
                }).catch((err) => {
                    dispatch(updateError("Error updating email. "))
                })
            } else {
                dispatch(updateError("Email wrong format. "))
            }
        }
        if (password != '') {
            if (password != pwConf) {
                dispatch(updateError("Two passwords do not match. "))
            } else {
                resource('PUT', 'password', { password })
                .then((response) => {
                    dispatch(fetchProfile())
                }).catch((err) => {
                    dispatch(updateError("Error updating password. "))
                })
            }
        }
    }
}