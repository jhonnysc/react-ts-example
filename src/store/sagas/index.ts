import { all, takeLatest } from 'redux-saga/effects'

import { Types as AuthTypes } from '../ducks/auth'
import { Types as UserTypes } from '../ducks/users'
import { requestLogin } from './auth'
import {
  requestUsers,
  deleteUser,
  requestCreateUser,
  requestUpdateUser,
} from './users'

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.LOGIN_REQUEST, requestLogin),
    takeLatest(UserTypes.REQUEST_USERS, requestUsers),
    takeLatest(UserTypes.DELETE_USER, deleteUser),
    takeLatest(UserTypes.CREATE_USER, requestCreateUser),
    takeLatest(UserTypes.UPDATE_USER, requestUpdateUser),
  ])
}
