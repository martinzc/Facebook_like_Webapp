//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
// Implement the two render functions first!
// Then verify the addTodo() adds an item with "my text",
// then make it add an item with the correct texts
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }

    toggleDone() {
        if (this.state.done) {
            this.setState({done: false})
        } else {
            this.setState({done: true})
        }
    }

    render() { return (
        <li>
            <i className="check glyphicon glyphicon-check" onClick={()=>this.toggleDone()}>{[]}</i>
            <span className={this.state.done ? "completed" : ""}>{this.props.text}</span>
            <i className="destroy glyphicon glyphicon-remove" onClick={()=>this.props.remove}>{[]}</i>
        </li>
        /*
        Note: 
        The toggleDone function does not exist, you need to implement 
        something.  It should toggle the value of done in the state.
    Note that you can't assign to the state, you use this.setState()
        
    Look at my example below for how the onClick handlers
        need to be called.

        h("li", null, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { className: this.state.done ? "completed" : "" }, this.props.text),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: this.props.remove }, []),
        ])
        */
    )}
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
    }

    addTodo() {
        // IMPLEMENT ME! (make the text correct use this.newTODO)
        const text = this.refs.inputVal.value
        // don't change this.setState(...)
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text}
            ]
        })
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    // remember you can only have one top level element in JSX
    // Don't delete my example, just comment it out so you can
    // reference back to it later

    render() { return (
        <div>
            <input id="newTODO" type="text" placeholder="To Do" ref="inputVal"></input>
            <button onClick={()=>this.addTodo()}>Add Item</button>
            <ul className="todo">
                {this.state.todoItems.map((x, i) => <ToDoItem key={i} text={x.text} remove={() => this.removeTodo(i) } />)}
            </ul>
            <span className="submit">
                <a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
                {this.state.todoItems.map((x, i) => <ul className="todo" key={i}>{x.text}</ul>)}
            </span>
        </div>
        
        // Notes:

        // Note that the remove attribute is supplied a function which executes
        // the remoteTodo function.  You'll want to do the same for your onClick
        // handlers -- do not set as a string.

        // The argument to removeTodo() needs to be the same as the key of
        // the ToDoItem (which is the id in the todoItems list).  See the
        // correspondance betwen key and the function call in my ToDoItems above.

        // To refer to the input in the addTodo function, you will likely want
        // something like this: <input ref={ (node) => this.newTODO = node } ...

        // h("div", null,
        //     h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
        //     h("button", { onClick: addTodo }, "Add Item"),
        //     h("span", { className: "submit" }, [
        //         h("a", { href: "https://webdev-rice.herokuapp.com",
        //              target: "_blank" }, "Submit your exercise"),
        //     ]),
        //     h("ul", { className: "todo" }, listItems)
        // )
        
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()