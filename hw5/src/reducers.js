import { combineReducers } from 'redux'

function navigate(state = { location:'landing' }, action) {
    switch (action.type) {
        case 'NAV_PROFILE':
            return { ...state, location: 'profile'}
        case 'NAV_MAIN':
            return { ...state, location: 'main' }
        case 'NAV_LANDING':
            return { ...state, location: 'landing' }
        default:
            return state
    }
}

function profile(state = { username:'', password:'', headline: '', avatar: '', zipcode: '', email: '', birthday:''}, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, username: action.username, password: action.password }
        case 'UPDATE_HEADLINE':
            return { ...state, headline: action.headline }
        case 'UPDATE_AVATAR':
            return { ...state, avatar: action.avatar }
        case 'UPDATE_ZIPCODE':
            return { ...state, zipcode: parseInt(action.zipcode) }
        case 'UPDATE_EMAIL':
            return { ...state, email: action.email }
        case 'UPDATE_DOB':
            return { ...state, dob: action.dob}
        case 'CLEARINFO':
            return { ...state, username:'', password:'', headline: '', avatar: '', zipcode: '', email: '', birthday: ''}
        default:
            return state
    }
}

function followers(state = { followers: {} }, action) {
    switch(action.type) {
        case 'UPDATE_FOLLOWERS':
            return { ...state, followers: action.followers }
        case 'CLEARINFO':
            return { ...state, followers: {}}
        default:
            return state
    }
}

function articles(state = { articles: {}, searchKeyword: '', avatars: {} }, action) {
    switch(action.type) {
        case 'UPDATE_ARTICLES':
            return { ...state, articles: action.articles }
        case 'SEARCH_ARTICLE':
            return { ...state, searchKeyword: action.keyword }
        case 'UPDATE_AVATARS':
            return { ...state, avatars: action.avatars }
        default:
            return state
    }
}

function error(state = { error:'', success:'' }, action)  {
    switch (action.type) {
        case 'SUCCESS':
            return { ...state, success: action.success, error: ''  }
        case 'ERROR':
            return { ...state, success: '', error: action.error }
        default:
            return { ...state, success: '', error: '' }
    }
}

const Reducer = combineReducers({
    navigate, profile, error, followers, articles
})

export default Reducer