import React from 'react'
import { connect } from 'react-redux'

import Landing from './auth/landing'
import Main from './main/main'
import Profile from './profile/profile'
import Nav from './main/nav'

const App = ({location}) => {

    // Switch view of the page according to location
    let view, nav

    switch(location) {
        case 'main': 
            view = <Main/>; 
            break;
        case 'profile': 
            view = <Profile/>; 
            break;
        case 'landing': 
            view = <Landing/>; 
            break;
        default: 
            view = <Landing/>; 
            break;
    }

    if (location == 'landing') {
        nav = ' '
    } else {
        nav = <Nav/>
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