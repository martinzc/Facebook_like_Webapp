import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'cz16test',
    password: 'fort-highest-ourselves'
}

exports.login = () => 
    sleep(500)
    .then(findId('username').clear())
    .then(findId('password').clear())
    .then(findId('username').sendKeys(exports.creds.username))
    .then(findId('password').sendKeys(exports.creds.password))
    .then(findId('logInButton').click())
    .then(sleep(500))

exports.logout = () =>
    sleep(500)
    .then(findId('logout').click())
    .then(sleep(500))
