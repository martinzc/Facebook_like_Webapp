import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, switchToIframe } from './selenium'
import common from './common'

describe('Test Landing Page', () => {

    // const preamble = 'you are logged in as'

    before('launch page', (done) => {
        go().then(done)
    })

    it('should register a new user', (done) => {
        sleep(500)
        .then(findId('registerUser').clear())
        .then(findId('registerEmail').clear())
        .then(findId('registerPhone').clear())
        .then(findId('registerZipcode').clear())
        .then(findId('registerPw').clear())
        .then(findId('registerPwConf').clear())
        .then(findId('registerUser').sendKeys("NewUser"))
        .then(findId('registerEmail').sendKeys("test@rice.edu"))
        .then(findId('registerPhone').sendKeys("832-983-9422"))
        .then(findId('registerDob').sendKeys("03-20-1995"))
        .then(findId('registerZipcode').sendKeys("88221"))
        .then(findId('registerPw').sendKeys("11"))
        .then(findId('registerPwConf').sendKeys("11"))
        .then(findId('registerBtn').click())
        .then(sleep(500))
        .then(findId('successMsg').getText().then(text => {
            expect(text).to.equal("Successfully registered as NewUser")
        }))
        .then(done)
    })
})
