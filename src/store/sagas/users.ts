import { call, put } from 'redux-saga/effects'

import api from '@/services/api'

import { Creators } from '../ducks/users'
// import { UserActionsEnum } from '../ducks/users'
// import { Data } from './types'

export function* requestUsers() {
  try {
    const { data } = yield call(api.get, '/developers')
    yield put(Creators.requestUsersSuccess(data))
  } catch (err) {
    yield put(Creators.requestUsersFailure())
  }
}
