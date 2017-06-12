import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateArticle, updateComment } from './articleActions'

class Comment extends Component {

    constructor(props) {
        super(props)        
        this.disabled = true
    }

    render() {
        let newCommentText
        const date = moment(new Date(this.props.date))
        return (
        <div className="row well well-sm">
            <div className="col-sm-1"></div>
            <div className="col-sm-8">
                <div className="row">
                    <div className="col-sm-4">
                        <p>{this.props.author} says</p>
                    </div>
                </div>
                <div className="row">
                    <p>{this.props.text}</p>
                    <small>{date.format('MM-DD')} {date.format('HH:mm')}</small>
                </div>
                {
                    this.props.author != this.props.username ? '' : 
                    <div>
                      <input className="form-control" type="text" placeholder="Say Something"
                        ref={(node) => newCommentText = node }/>
                      <button type="button" className="btn btn-primary center-block" onClick={() => {  
                        if (newCommentText.value != '') {
                          this.props.dispatch(updateArticle({text: newCommentText.value, commentId: 
                            this.props.commentId}, this.props.articleId))
                          newCommentText.value = ''
                        }
                      }}>Edit Comment</button>
                    </div>
                }
            </div>
        </div>
    )}
}

Comment.propTypes = {
    articleId: PropTypes.string.isRequired,
    commentId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(Comment)