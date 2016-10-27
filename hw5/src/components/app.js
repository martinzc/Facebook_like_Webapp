import React from 'react'
import { connect } from 'react-redux'

import Landing from './auth/landing'
import Main from './main/main'
import Profile from './profile/profile'
import Nav from './main/nav'

const App = ({location}) => {

    // Switch view of the page according to location
    let view, nav

    if (location == 'landing') {
        nav = ' '
        view = <Landing/>; 
    } else if (location == 'main') {
        nav = <Nav/>
        view = <Main/>; 
    } else if (location == 'profile') {
        nav = <Nav/>
        view = <Profile/>; 
    }

    return (
        <div>
            { nav }
            { view }
        </div>
    )
}

export default connect((state) => {
    return { location: state.navigate.location }
})(App)