import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import Home from './components/home'
import Provision from './components/provision'
import Configure from './components/configure'
import Deploy from './components/deploy'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/Provision' component={Provision} />
    <Route exact path='/Configure' component={Configure} />
    <Route exact path='/Deploy' component={Deploy} />
  </Layout>
)