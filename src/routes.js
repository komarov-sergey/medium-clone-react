import {Switch, Route} from 'react-router-dom'
import React from 'react'

import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'
import Authentication from 'pages/authentication'

export default () => {
  return (
    <Switch>
      <Route path='/' component={GlobalFeed} exact />
      <Route path='/login' component={Authentication} exact />
      <Route path='/register' component={Authentication} exact />
      <Route path='/articles/:slug' component={Article} />
    </Switch>
  )
}