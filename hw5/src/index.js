require('expose?$!expose?jQuery!jquery')
// require('bootstrap-webpack')

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import Reducer from './reducers'
import App from './components/app'

import { initialVisit } from './components/auth/authActions'

const logger = createLogger()

let store = createStore(Reducer, applyMiddleware(thunkMiddleware))

// store.dispatch(initialVisit())

render(
    <Provider store={store}>
    	<App />
    </Provider>,
    document.getElementById('app')
)



