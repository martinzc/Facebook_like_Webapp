import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Comment extends Component {

    constructor(props) {
        super(props)        
        this.disabled = true
    }

    render() {
        const date = moment(new Date(this.props.date))
        return (
        <div className="row well well-sm">
            <div className="col-sm-1"></div>
            <div className="col-sm-8">
                <div className="row">
                    <div className="col-sm-4">
                        <img className="followingImage" src={ this.props.avatar }/>
                    </div>
                    <div className="col-sm-4">
                        <p>{this.props.author}:</p>
                    </div>
                </div>
                <div className="row">
                    <p>{this.props.text};</p>
                    <small>{date.format('MM-DD')} {date.format('HH:mm')}</small>
                </div>
            </div>
        </div>
    )}
}

Comment.propTypes = {
    commentId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
}

export default connect()(Comment)