import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { profile, error, articles } from './reducers'

 

describe('Test reducer', () => {

    it('should initialize state', (done)=>{      
        let output = profile({}, { type: 'CLEARINFO'})
        expect(output.username).to.equal('')
        expect(output.password).to.equal('')
        expect(output.headline).to.equal('')
        expect(output.avatar).to.equal('')
        expect(output.zipcode).to.equal('')
        expect(output.email).to.equal('')
        expect(output.birthday).to.equal('')
        done()
    })

    it('should state success (for displaying success message to user)', (done)=>{    
        let output = error({}, { type: 'SUCCESS', success: 'Test Success'})
        expect(output.success).to.equal('Test Success')
        expect(output.error).to.equal('')
        done()
    })

    it('should state error (for displaying error message to user)', (done)=>{
        let output = error({}, { type: 'ERROR', error: 'Test Error'})
        expect(output.error).to.equal('Test Error')
        expect(output.success).to.equal('')
        done()
    })

    it('should set the articles', (done)=>{
        let output = articles({}, { type: 'UPDATE_ARTICLES', articles: ['articles']})
        expect(output.articles[0]).to.equal('articles')
        done()
    })

    it('should set the search keyword', (done)=>{
        let output = articles({}, { type: 'SEARCH_ARTICLE', keyword: 'testSearch'})
        expect(output.searchKeyword).to.equal('testSearch')
        done()
    })    
 
})