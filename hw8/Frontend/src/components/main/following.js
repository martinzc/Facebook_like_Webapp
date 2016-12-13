import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateFollower, deleteFollower } from './followingActions'

let ErrorMessage = ({error, success}) => (
    <div className="row">
        <div className="col-sm-11">
        { error == '' ? '' :
            <div className="alert alert-danger">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">{ error }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
        { success == '' ? '' :
            <div className="alert alert-success">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="successMsg">{ success }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
        </div>
        <div className="col-sm-1"></div>
    </div>
)
ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}
ErrorMessage = connect((state) => {
    return { error: state.error.error, success: state.error.success }
})(ErrorMessage)

const Follower = ({name, avatar, headline, dispatch}) => (
    <div className="well well-sm followedUser" id="followedUser">
        <img src={avatar} alt="Profile Pic" id="profilePic"></img>
        <p className="text-primary">{name}</p>
        <small className="text-info" id="status">{headline}
            </small><br></br>
        <button type="button" className="btn btn-primary center-block" 
            id="unfollow" onClick={() => {  
                dispatch(deleteFollower(name))
            }}>Unfollow</button>
    </div>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
}

const Following = ({followers, dispatch}) => {
    let newFollowUser
    return (
        <div>
        <div>
          <input id="newFollowerText" className="form-control" type="text" placeholder="user ID"
            ref={(node) => newFollowUser = node }/>
          <button id="followBtn" type="button" className="btn btn-primary center-block" onClick={() => {  
            if (newFollowUser.value != '') {
              dispatch(updateFollower(newFollowUser.value))
              newFollowUser.value = ''
            }
          }}>Follow</button>
          <br></br>
          <ErrorMessage/>
          <br></br>
        </div>
        <div>
        { Object.keys(followers).sort().map((f) => followers[f]).map((follower) =>
            <Follower key={follower.name}
                name={follower.name} avatar={follower.avatar} headline={follower.headline} dispatch={dispatch}/>
        )}
        </div>
        </div>
    )
}

Following.propTypes = {
    followers: PropTypes.object.isRequired
}


export default connect(
    (state) => {
        return {
            followers: state.followers.followers
        }
    }
)(Following)
