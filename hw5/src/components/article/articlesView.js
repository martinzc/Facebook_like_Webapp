
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Article from './article'
import { searchKeyword } from './articleActions'

export const ArticlesView = ({articles, avatars, keyword, username, dispatch}) => {  
  let lockeyword = ''
  return (
    <div className="col-sm-8" >
      <div className="row">
        <div className="well well-lg">
          <input className="form-control" type="text" placeholder="Enter your search here"
            ref={(node) => lockeyword = node }
            onChange={() => { dispatch(searchKeyword(lockeyword.value)) }}/>
        </div>
      </div>
      { articles.sort((a,b) => {
        if (a.date < b.date)
          return 1
        if (a.date > b.date)
          return -1
        return 0
      }).map((article) =>
        <Article key={article._id} _id={article._id} username={username} author={article.author}
          date={article.date} text={article.text} img={article.img} avatar={article.avatar}
          comments={article.comments}/>
      )}
    </div>
  )
}

ArticlesView.PropTypes = {
  articles: PropTypes.object,
  avatars: PropTypes.object,
  keyword: PropTypes.string
}

export function filterArticle(state) {
  const avatars = state.articles.avatars
  const keyword = state.articles.searchKeyword
  let articles = Object.keys(state.articles.articles).map((id) => state.articles.articles[id])
  if (keyword && keyword.length > 0) {
    articles = articles.filter((a) => {
      return a.text.toLowerCase().search(keyword.toLowerCase()) >= 0 ||
             a.author.toLowerCase().search(keyword.toLowerCase()) >= 0
    })
  }
  articles = articles.map((a) => {
    return {...a, avatar: avatars[a.author], comments: a.comments.map((c) => {
      return { ...c, avatar: avatars[c.author] }
    })}
  })
  return articles

}

export default connect(
  (state) => {
    let articles = filterArticle(state)
    return {
      username: state.profile.username,
      articles: articles,
      avatars: state.articles.avatars,
      keyword: state.articles.keyword
    }
  }
)(ArticlesView)
