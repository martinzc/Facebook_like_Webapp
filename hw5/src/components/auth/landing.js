import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'

let ErrorMessage = ({error, success}) => (
    <div className="row">
        { error.length == 0 ? '' :
            <div className="alert alert-danger">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="errorMessage">{ error }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
        { success.length == 0 ? '' :
            <div className="alert alert-success">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="successMessage">{ success }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
    </div>
)
ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}
ErrorMessage = connect((state) => {
    return { error: state.error.error, success: state.error.success }
})(ErrorMessage)


const Landing = () => (
    <div>
    <div className="jumbotron">
        <h2>Welcome to RiceBook</h2>
    </div>
    <ErrorMessage/>
    <div className="container-fluid">
        <Login/>
        <div className="col-sm-1">
        </div>
        <Register/>
    </div>
    </div>
)

export default Landing