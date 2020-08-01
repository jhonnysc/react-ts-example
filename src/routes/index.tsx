import React from 'react'
import { useSelector } from 'react-redux'
import { Switch } from 'react-router-dom'

import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'

import { Home } from '@/pages/home'
import { AppState } from '@/store/ducks/types'

import Route from './Route'

interface RouterProps {
  history: History
}

const Routes = (props: RouterProps) => {
  const { history } = props

  // const token = useSelector((state: AppState) => state.Auth.token)

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </ConnectedRouter>
  )
}

export default Routes
