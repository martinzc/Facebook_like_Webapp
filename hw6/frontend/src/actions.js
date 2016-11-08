import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

export const url = 'https://webdev-dummy.herokuapp.com'

export function navToProfile() { return { type: 'NAV_PROFILE' }}
export function navToMain() { return { type: 'NAV_MAIN' }}
export function navToLanding() { return { type: 'NAV_LANDING' }}
export function updateError(error) { return { type: 'ERROR', error }}
export function updateSuccess(success) { return { type: 'SUCCESS', success }
}
export function clearInfo() {return {type: 'CLEAR_INFO'}}

export const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        // console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

export const resourceImg = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include'
  }
  if (payload) options.body = payload

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

