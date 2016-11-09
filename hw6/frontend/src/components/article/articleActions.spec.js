"use strict"

import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

 

describe('Test Article', () => {

    let fetchArticles, searchKeyword, url

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            fetchArticles = require('./articleActions').fetchArticles
            searchKeyword = require('./articleActions').searchKeyword
            url = require('../../actions').url

        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    it('should fetch articles', (done)=>{

        mock(`${url}/articles`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{articles:[{_id: 0, payload: ""}]}
        })
        fetchArticles()((response) => {
            expect(response.type).to.equal('UPDATE_ARTICLES')
            expect(response.articles).to.equal({ '0': { _id: 0, payload: '' } })
        })
        done()
    })

    it('should update the search keyword', (done)=>{
        let output = searchKeyword('testKeyword')
        expect(output.type).to.equal('SEARCH_ARTICLE')
        expect(output.keyword).to.equal('testKeyword')
        done()
    })

})