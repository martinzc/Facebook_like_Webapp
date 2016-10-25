import { resource, updateError, updateSuccess, navToProfile, navToMain, navToLanding } from '../../actions'
import {fetchProfile} from '../profile/profileActions'
import {fetchFollowers} from '../main/followingActions'
import {fetchArticles} from '../article/articleActions'


export function initialVisit() {
    return (dispatch) => {
        // try to log in
        resource('GET', 'headlines').then((response) => {
            dispatch(fetchProfile())
            dispatch(fetchFollowers())
            dispatch(fetchArticles())
            dispatch(navToMain())
        }).catch((err) => {
            // that's okay
        })
    }
}

const updateInfo = (username, password) => {return { type:"LOGIN", username, password}}

const clearInfo = () => {return { type:"CLEARINFO", username, password}}

export function login(username, password) {
    return (dispatch) => {
        resource('POST', 'login', { username, password })
        .then((response) => {
            dispatch(updateInfo(username, password))
            dispatch(initialVisit())
        }).catch((err) => {
            dispatch(updateError(`There was an error logging in as ${username}`))
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