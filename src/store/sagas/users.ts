import { call, put } from 'redux-saga/effects'

import api from '@/services/api'

import {
  Creators,
  RequestUser,
  UserActionsEnum,
  DeleteUser,
  CreateUserRequest,
} from '../ducks/users'
import { SagaType } from './types'

export function* requestUsers(
  payload: SagaType<RequestUser, UserActionsEnum.REQUEST_USERS>,
) {
  try {
    const { data } = yield call(api.get, '/developers', {
      params: payload.query,
    })
    yield put(Creators.requestUsersSuccess(data))
  } catch (err) {
    yield put(Creators.requestUsersFailure())
  }
}

export function* deleteUser(
  payload: SagaType<DeleteUser, UserActionsEnum.DELETE_USER>,
) {
  try {
    yield call(api.delete, `/developers/${payload.id}`)
    yield put(Creators.deleteUserSuccess())
    yield put(Creators.requestUsers({ limit: 10, page: 1 }))
  } catch (err) {
    yield put(Creators.deleteUserFailure())
  }
}

export function* requestCreateUser(
  payload: SagaType<CreateUserRequest, UserActionsEnum.CREATE_USER>,
) {
  try {
    yield call(api.post, '/developers', payload.user)
    yield put(Creators.createUserSuccess())
    yield put(Creators.requestUsers({ limit: 10, page: 1 }))
  } catch (err) {
    yield put(Creators.createUserFailure())
  }
}
