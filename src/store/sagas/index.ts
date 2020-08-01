import { all, takeLatest } from 'redux-saga/effects'

import { Types as AuthTypes } from '../ducks/auth'
import { Types as UserTypes } from '../ducks/users'
import { requestLogin } from './auth'
import { requestUsers } from './users'

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.LOGIN_REQUEST, requestLogin),
    takeLatest(UserTypes.REQUEST_USERS, requestUsers),
  ])
}
