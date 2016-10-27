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
        let articles = []
        let node = shallow(<ArticlesView username='' articles={articles}/>)
        expect(node.children().length).to.equal(4)
        done()
    })

    it('should dispatch actions to create a new article', (done)=>{
        // ArticlesView({username: '', dispatch: []})
        done()
    })

    it('should filter displayed articles by the search keyword', (done)=>{
    		// let state = {navigate: {location: 'main'}, profile: {Object}, error: Object, followers: Object, articles: {articles: {}, avatars: {}, searchKeyword: ""}}
      //   let output = filterArticle(state)
    })
 
})
