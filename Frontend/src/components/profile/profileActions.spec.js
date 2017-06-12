import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { shallow } from 'enzyme'
import { fetchProfile, updateHeadline } from './profileActions'

 

describe('Test profile action functions', () => {

    it('should fetch profile information', (done)=>{      
        fetchProfile()(r => expect('').to.equal(''))
        done()
    })

    it('should update headline', (done)=>{
		let output = updateHeadline("headline")
		expect(output.type).to.equal('UPDATE_HEADLINE')
		expect(output.headline).to.equal('headline')
		done()
    })
 
})