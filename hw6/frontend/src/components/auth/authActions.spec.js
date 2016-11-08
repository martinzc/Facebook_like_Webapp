import { expect } from 'chai'
import mockery from 'mockery'
import resource, {url} from '../../actions'
import fetch, { mock } from 'mock-fetch'

 

describe('Test Authentication', () => {

    let login, logout, url

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            login = require('./authActions').login
            logout = require('./authActions').logout
            url = require('../../actions').url

        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    it('should be able to login', (done)=>{

        const username = 'someuser'
        const password = 'somepassword'

        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:{username, password}
        })

        mock(`${url}/avatars`,{
            headers: {'Content-Type':'application/json'}
        })
        login(username, password)((response) => {
            expect(response.type).to.equal('MAIN')
            expect(response.username).to.equal(username)
            expect(response.password).to.equal(password)
        })
        done()
    })

    it('should not be able to login with invalid account', (done)=>{

        const username = 'someuser'
        const password = 'somepassword'

        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:{error:'Error logging in'}
        })

        mock(`${url}/avatars`,{
            headers: {'Content-Type':'application/json'}
        })
        login(username, password)((response) => {
            expect(response.type).to.equal('ERROR')
            expect(response.error).to.equal('Error logging in')
        })
        done()
    })
 
    it('should be able to logout', (done)=>{

        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json:{result:'success'}
        })


        logout()(response => {
            expect(response.type).to.equal("LANDING")
        })
        done()
    })
})