import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'

import { reducer as Auth } from './auth'

const reducers = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    Auth,
  })

export default reducers
