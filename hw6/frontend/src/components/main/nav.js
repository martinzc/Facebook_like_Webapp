import React from 'react'
import { connect } from 'react-redux'
import { navToMain, navToProfile, navToLanding } from '../../actions'
import { logout } from '../auth/authActions'

const Nav = ({location, dispatch}) => (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">RiceBook</a>
        </div>
        { location == 'main' ? 
            <ul className="nav navbar-nav">
              <li className="active"><a href="#" onClick={()=>{
                dispatch(navToMain())
              }} id="home">Home</a></li>
              <li><a href="#" onClick={()=>{
                dispatch(navToProfile())
              }} id="profile">Profile</a></li>
              <li><a href="#" onClick={()=>{
                dispatch(logout())
              }} id="logout">Log Out</a></li>
            </ul>
            :
            <ul className="nav navbar-nav">
              <li><a href="#" onClick={()=>{
                dispatch(navToMain())
              }} id="home">Home</a></li>
              <li className="active" onClick={()=>{
                dispatch(navToProfile())
              }}><a href="#" id="profile">Profile</a></li>
              <li><a href="#" onClick={()=>{
                dispatch(logout())
              }} id="logout">Log Out</a></li>
            </ul>
        }
      </div>
    </nav>
)

export default connect((state) => {
  return {location: state.navigate.location}
})(Nav)