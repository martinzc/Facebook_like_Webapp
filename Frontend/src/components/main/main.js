import React from 'react'

import Nav from './nav'
import Headline from './headline'
import Following from './following'
import ArticlesView from '../article/articlesView'

const Main = () => {
	return (
		<div className="container-fluid" id="pageContent">
		   <div className="col-sm-3  well well-sm">
		       	<Headline/>
					<br></br>
					<p className="text-info" id="status">Followed Users</p>
					<Following/>
		   </div>
		   <div className="col-sm-1">
		   </div>
			<ArticlesView/>
		</div>

	)
}

export default Main