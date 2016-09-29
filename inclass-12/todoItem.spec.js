import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		// use TestUtils.renderIntoDocument
		// findDOMNode and assert 3 children of the ToDoItem element
		// assert the className is ''
		// assert the innerHTML of the todo is the text you initially set
		const todos = [
			{  id: 1, text: 'hi', done: false }
		] 
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem id={todos[0].id} toggle={_ => _} remove={_ => _} text={todos[0].text} done={todos[0].done} />
			</div>
		)
		const elements = findDOMNode(node).children[0]
		expect(elements.children.length).to.equal(3)
		expect(elements.className).to.equal('')
		expect(elements.children[1].innerHTML).to.equal('hi')
	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		// use TestUtils.renderIntoDocument
		// when the checkbox is clicked via TestUtils.Simulate.click()
		// we expect the variable toggled to be true
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem toggle={()=>toggled = !toggled} remove={_ => _} text={'test'} done={false} />
			</div>
		)
		const elements = findDOMNode(node).children[0]
		expect(toggled).to.be.false
	   TestUtils.Simulate.click(elements.children[0])
		expect(toggled).to.be.true

	})

	it('should remove an item when clicked', () => {
		let removed = false
		// use TestUtils.renderIntoDocument
		// when the remove button is clicked via TestUtils.Simulate.click()
		// we expect the variable removed to be true
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem toggle={_ => _} remove={()=>removed = !removed} text={'test'} done={false} />
			</div>
		)
		const elements = findDOMNode(node).children[0]
		expect(removed).to.be.false
	   TestUtils.Simulate.click(elements.children[2])
		expect(removed).to.be.true
	})

	it('should display a completed ToDo', () => {
		// use TestUtils.renderIntoDocument
		// the item should have done=true
		// assert that the rendered className is "completed"
		const todos = [
			{  id: 1, text: 'hi', done: true }
		] 
		const node = TestUtils.renderIntoDocument(<div>
				<ToDoItem id={todos[0].id} toggle={_ => _} remove={_ => _} text={todos[0].text} done={todos[0].done} />
			</div>
		)
		const elements = findDOMNode(node).children[0]
		expect(elements.children[1].className).to.equal('completed')
	})

})
