const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const port = process.env.PORT || 3000

const resource = (method, endpoint, payload) => {
    const url = `http://localhost:${port}/${endpoint}`
    const options = { method, headers: { 'Content-Type': 'application/json' }}
    if (payload) options.body = JSON.stringify(payload)
    return fetch(url, options).then(r => {
            if (r.status == 200) {
                return r.json()
            } else {    
                const msg = `ERROR ${method} ${endpoint} returned ${r.status}`
                console.error(msg)
                throw new Error(msg)
            }
        })
}
 

describe('Test Article', () => {

    it('should POST article', done => {
        const testText = "Test Text"
        resource('POST', 'article', { text: testText }).then(body => {
            expect(body.articles).to.be.ok
            expect(body.articles[0].text).to.be.eql(testText)
        }).then(done).catch(done)
    })

})