import Promise from 'bluebird'
import { resource, updateError } from '../../actions'

export function delFollower(name) { return fetchFollowers('DELETE', name) }
export function addFollower(name) { return fetchFollowers('PUT', name) }
import {fetchProfile} from '../profile/profileActions'
import {fetchArticles} from '../article/articleActions'

export function fetchFollowers(method, name) {
    return (dispatch, getState) => {
        if (method == 'PUT' && getState().followers.followers[name]) {
            return dispatch(updateError(`Already following ${name}`))
        }

        resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
        .then((response) => {

            if (method == 'PUT' && response.following.indexOf(name) < 0) {
                return dispatch(updateError(`${name} is not a valid user`))
            }

            const followers = response.following.reduce((o, v, i) => { o[v] = {name: v}; return o }, {})
            const followerList = response.following.join(',')

            const headlinePromise = resource('GET', `headlines/${followerList}`)
                .then((response) => {
                    response.headlines.forEach((s) => {
                        const user = followers[s.username]
                        if (user) {
                            user.headline = s.headline
                        }
                    })
                })

            const avatarPromise = resource('GET', `avatars/${followerList}`)
                .then((response) => {
                    response.avatars.forEach((s) => {
                        const user = followers[s.username]
                        if (user) {
                            user.avatar = s.avatar
                        }
                    })
                })

            const updateFollowers = (followers) => {return { type:"UPDATE_FOLLOWERS", followers}}

            Promise.all([headlinePromise, avatarPromise]).then(() => {
                dispatch(updateFollowers(followers))
            })
        }).catch((err) => {
            dispatch(updateError(`There was an error getting your list of followed users ${err}`))
        })
    }
}

export function updateFollower(id) {
    return (dispatch) => {
        resource('PUT', 'following/' + id)
            .then((response) => {
                dispatch(fetchProfile())
                dispatch(fetchArticles())
                dispatch(fetchFollowers())
            }).catch((err) => {
            })
    }
}

export function deleteFollower(id) {
    return (dispatch) => {
        resource('DELETE', 'following/' + id)
            .then((response) => {
                dispatch(fetchProfile())
                dispatch(fetchArticles())
                dispatch(fetchFollowers())
            }).catch((err) => {
            })
    }
}