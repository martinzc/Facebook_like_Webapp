/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url('/articles'))
		.then(res => {
			console.log(res)
			expect(res.articles.length > 1 ).to.be.true
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
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
		     console.error(`${method} ${endpoint} ${r.statusText}`)
		     throw new Error(r.statusText)
		   }
		 })
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		done(new Error('Not implemented'))
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		done(new Error('Not implemented'))
	}, 200)

});
