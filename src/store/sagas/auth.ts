import { call, put } from 'redux-saga/effects'

import api from '@/services/api'

import { LoginRequestPayload, Creators, AuthEnum } from '../ducks/auth'
import { Data } from './types'

export function* requestLogin(
  payload: Data<LoginRequestPayload, AuthEnum.LOGIN_REQUEST>,
) {
  try {
    const { data } = yield call(api.post, '/admin/login', payload)
    yield put(Creators.loginSuccess(data))
  } catch (err) {
    yield put(Creators.loginFailure())
  }
}
