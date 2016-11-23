import Action, { resource, resourceImg } from '../../actions'
import {fetchProfile} from '../profile/profileActions'
import {fetchFollowers} from '../main/followingActions'

export function fetchArticles() {
    return (dispatch, getState) => {
        resource('GET', 'articles')
        .then((response) => {
            const articles = response.articles.reduce((article, author) => {
                article[author._id] = author
                return article
            }, {})
            dispatch({ type: 'UPDATE_ARTICLES', articles})
            const avatars = getState().articles.avatars
            const authors = new Set(response.articles.reduce((o, article) => {
                article.comments.map((c) => c.author).forEach((author) => o.push(author))
                return o
            }, []).filter((author) => !avatars[author]))
            if (authors.size > 0) {
                resource('GET', `avatars/${[...authors].join(',')}`)
                .then((response) => {
                    response.avatars.forEach((s) => {
                        avatars[s.username] = s.avatar
                    })
                    dispatch({ type: 'UPDATE_AVATARS', avatars })
                })
            }
        })
    }
}

export function searchKeyword(keyword) {
    return { type: 'SEARCH_ARTICLE', keyword }
}

export function uploadNewArticle(payload) {
    return (dispatch) => {
        resourceImg('POST', 'article', payload)
            .then((response) => {
                dispatch(fetchProfile())
                dispatch(fetchArticles())
                dispatch(fetchFollowers())
            }).catch((err) => {
            })
    }
}

export function uploadNewArticleWithOnlyText(payload) {
    return (dispatch) => {
        resource('POST', 'article', payload)
            .then((response) => {
                dispatch(fetchProfile())
                dispatch(fetchArticles())
                dispatch(fetchFollowers())
            }).catch((err) => {
            })
    }
}

export function updateArticle(payload, id) {
    return (dispatch) => {
        resource('PUT', 'articles/' + id, payload)
            .then((response) => {
                dispatch(fetchProfile())
                dispatch(fetchArticles())
                dispatch(fetchFollowers())
            }).catch((err) => {
            })
    }
}

export function updateComment(payload, id) {
    return (dispatch) => {
        resource('PUT', 'articles/' + id, payload)
            .then((response) => {
                dispatch(fetchProfile())
                dispatch(fetchArticles())
                dispatch(fetchFollowers())
            }).catch((err) => {
            })
    }
}