import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Comment from './comment'
import { updateArticle, updateComment } from './articleActions'

class Article extends Component {

  constructor(props) {
    super(props)
    this.hideComments = true
  }

  render() {
    let newArticleText, newCommentText
    const date = moment(new Date(this.props.date))
    return (
      <div className="row">
        <div className="well well-lg">
          <div className="row">
            <div className="col-sm-2">
              <img className="followingImage" src={ this.props.avatar }/>
            </div>
            <div className="col-sm-4">
              <div className="row">
                <p>{this.props.author}</p>
              </div>
              <div className="row">
                <small>{date.format('HH:mm')} {date.format('MM-DD')} </small>
              </div> 
            </div>
          </div>

          <div className="row">
            <div className="col-sm-2">
            </div>
            <div className="col-sm-8">
                <img className="postImage" src={this.props.img}/>
            </div>
            <div className="col-sm-2">
            </div>
          </div>

          <div className="row">
            <div className="col-sm-1">
            </div>
            <div className="col-sm-10">
                <p id="articleID">{this.props.text}</p>
            </div>
            <div className="col-sm-1">
            </div>
          </div>

          {
            this.props.author != this.props.username ? '' : 
            <div>
              <input id="editText" className="form-control" type="text" placeholder="Say Something"
                ref={(node) => newArticleText = node }/>
              <button id="editBtn" type="button" className="btn btn-primary center-block" onClick={() => {  
                if (newArticleText.value != '') {
                  this.props.dispatch(updateArticle({text: newArticleText.value}, this.props._id))
                  newArticleText.value = ''
                }
              }}>Edit</button>
            </div>
          }

          <div className="row">
          <div className="col-sm-2">
          </div>
          <div className="col-sm-8">
            <label className="btn btn-primary center-block"
              onClick={() => {
                this.hideComments = !this.hideComments
                this.forceUpdate()
              }}>
              { this.hideComments ? 'Show' : 'Hide' } { this.props.comments.length } Comments 
            </label>
            <br></br>

            { this.hideComments ? '' : this.props.comments.sort((a,b) => {
              return a.date < b.date ? 1 : -1
            }).map((comment) =>
                <Comment key={comment.commentId} articleId={this.props._id} username={this.props.username}
                  commentId={comment.commentId} author={comment.author} date={comment.date}
                  text={comment.text} avatar={comment.avatar} dispatch={this.props.dispatch} />
            )}

            <div>
              <input className="form-control" type="text" placeholder="Say Something"
                ref={(node) => newCommentText = node }/>
              <button type="button" className="btn btn-primary center-block" onClick={() => {  
                if (newCommentText.value != '') {
                  this.props.dispatch(updateArticle({text: newCommentText.value, commentId: -1}, this.props._id))
                  newCommentText.value = ''
                }
              }}>Comment</button>
            </div>
          </div>
          </div>
        </div>
      </div>
  )}
}

Article.propTypes = {
  username: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    ...Comment.propTypes
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(Article)