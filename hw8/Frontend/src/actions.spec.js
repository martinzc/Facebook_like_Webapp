import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

 

describe('Test action functions', () => {

    let url, Reducer, resource, updateError, updateSuccess 
    let navToMain, navToProfile, navToLanding

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            url = require('./actions').url
            resource = require('./actions').resource
            updateError = require('./actions').updateError
            updateSuccess = require('./actions').updateSuccess
            navToMain = require('./actions').navToMain
            navToProfile = require('./actions').navToProfile
            navToLanding = require('./actions').navToLanding
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    it('resource should be a resource / resource should be POSTable', (done)=>{

        const username = 'someuser'
        const password = 'somepassword'

        const postOptions =  {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            json:{username, status:"success"}
          }

        const getOptions =  {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            json:{headlines:'hi', status:"success"}
          }

        mock(`${url}/login`,postOptions)
        mock('${url}/headlines', getOptions)

        resource('POST', 'login', { 
          username: username, 
          password: password 
        })
        .then(r => {
            expect(r).to.equal({username: 'someuser', status: 'success'})
        }).then(resource('GET', 'headlines'))
        .then(r => {
            expect(r).to.equal({headlines:'hi', status: 'success'})
        })
        done()
    })

    it('resource should give me the http error', (done)=>{

        const username = 'someuser'
        const password = 'somepassword'
        let newUrl = 'https://testWrongURL.herokuapp.com'

        const options =  {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            json:{error: 'HTTP Error'}
          }

        mock(`${newUrl}/login`,options)

        resource('POST', 'login')
        .then(r => {
            expect(r).to.equal({error: 'HTTP Error'})
        })
        done()
    })

    it('should update error message', (done)=>{
        let output = updateError('testError')
        expect(output.type).to.equal('ERROR')
        expect(output.error).to.equal('testError')
        done()
    })

    it('should update success message', (done)=>{
        let output = updateSuccess('testSuccess')
        expect(output.type).to.equal('SUCCESS')
        expect(output.success).to.equal('testSuccess')
        done()
    })

    it('should navigate (to profile, main, or landing)', (done)=>{
        let navMain = navToMain()
        expect(navMain.type).to.equal('NAV_MAIN')
        let navLanding = navToLanding()
        expect(navLanding.type).to.equal('NAV_LANDING')
        let navProfile = navToProfile()
        expect(navProfile.type).to.equal('NAV_PROFILE')
        done()
    })
 
})