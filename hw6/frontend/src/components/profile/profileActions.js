import { updateError, resource, resourceImg, updateSuccess } from '../../actions'
import {fetchFollowers} from '../main/followingActions'
import {fetchArticles} from '../article/articleActions'

export function fetchProfile() {
    return (dispatch) => {
        dispatch(fetchField('avatars'))
        dispatch(fetchField('zipcode'))
        dispatch(fetchField('email'))
        dispatch(fetchField('headlines'))
        dispatch(fetchField('dob'))
    }
}

// Return an action according to the function
export const updateHeadline = (headline) => {return { type:"UPDATE_HEADLINE", headline }}
export const updateAvatar = (avatar) => {return { type:"UPDATE_AVATAR", avatar }}
export const updateZipcode = (zipcode) => {return { type:"UPDATE_ZIPCODE", zipcode }}
export const updateEmail = (email) => {return { type:"UPDATE_EMAIL", email }}
export const updateDOB = (dob) => {return { type:"UPDATE_DOB", dob }}

export function fetchField(field) {
    return (dispatch) => {
        resource('GET', field).then((response) => {
            switch(field) {
                case 'headlines':
                    dispatch(updateHeadline(response.headlines[0].headline));
                    break;
                case 'avatars':
                    dispatch(updateAvatar(response.avatars[0].avatar));
                    break;
                case 'email':
                    dispatch(updateEmail(response.email));
                    break;
                case 'zipcode':
                    dispatch(updateZipcode(response.zipcode));
                    break;
                case 'dob':
                    var date = new Date(response.dob);
                    dispatch(updateDOB(date.toString()));
                    break;
                default:
                    break;
            }
        })
    }
}
export function uploadAvatar(payload) {
    return (dispatch) => {
        resourceImg('PUT', 'avatar', payload)
            .then((response) => {
                dispatch(fetchProfile())
                dispatch(fetchArticles())
                dispatch(fetchFollowers())
            }).catch((err) => {
                dispatch(updateError("There was an error updating avatar"))
            })
    }
}
