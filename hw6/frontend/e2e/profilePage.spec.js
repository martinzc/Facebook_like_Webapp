import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, searchText } from './selenium'
import common from './common'

describe('Test Main Page', () => {

    // const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(findId('profile').click()).then(done)
    })

    it('should update email', (done) => {
        sleep(500)
        .then(findId('email').clear())
        .then(findId('email').sendKeys("a@b.co"))
        .then(findId('changeBtn').click())
        .then(sleep(500))
        .then(findId('email').getAttribute("placeholder").then(text => {
        	expect(text).to.equal("a@b.co")
        }))
        .then(done)
    })


    it('should update zipcode', (done) => {
        sleep(500)
        .then(findId('zipCode').clear())
        .then(findId('zipCode').sendKeys("12345"))
        .then(findId('changeBtn').click())
        .then(sleep(500))
        .then(findId('zipCode').getAttribute("placeholder").then(text => {
        	expect(text).to.equal("12345")
        }))
        .then(done)
    })

    it('should update password', (done) => {
        sleep(500)
        .then(findId('password').clear())
        .then(findId('password').sendKeys("123"))
        .then(findId('passwordConfirmation').clear())
        .then(findId('passwordConfirmation').sendKeys("123"))
        .then(findId('changeBtn').click())
        .then(findId('passwordConfirmation').getText().then(text => {
        	expect(text).to.equal("")
        }))
        .then(done)
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
