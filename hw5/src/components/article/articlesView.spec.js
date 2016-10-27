import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { shallow } from 'enzyme'
import {ArticlesView, filterArticle} from './articlesView'


 

describe('Test action functions', () => {

    it('should render articles', (done)=>{
        let articles = [{_id: 0, username: 'test', author: 'testAuth', date: '000-000-000', text: 'testText',
            img: 'http://test.png', avatar: 'http://avatar.png', comments: [{}]}]
        let node = shallow(<ArticlesView username='' articles={articles}/>)
        expect(node.children().length).to.equal(2)
        done()
    })

    it('should dispatch actions to create a new article', (done)=>{
        // ArticlesView({username: '', dispatch: []})
        done()
    })

    it('should filter displayed articles by the search keyword', (done)=>{
    	let state = {navigate: {location: 'main'}, articles: {articles: {}, avatars: {}, searchKeyword: ""}}
		let output = filterArticle(state)
		expect(output).to.equal([])
		done()
    })
 
})
