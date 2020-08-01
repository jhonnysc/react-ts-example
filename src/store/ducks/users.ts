import { Action } from 'redux'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { UserPagination, User } from '@/types'

/* ------------- Types and Action Creators ------------- */

export enum UserActionsEnum {
  REQUEST_USERS = 'REQUEST_USERS',
  REQUEST_USERS_SUCCESS = 'REQUEST_USERS_SUCCESS',
  REQUEST_USERS_FAILURE = 'REQUEST_USERS_FAILURE',
}

export interface ActionTypes extends Action<UserActionsEnum> {
  requestUsers: () => Action
  requestUsersSuccess: (data: UserPagination) => Action
  requestUsersFailure: () => Action
}

type UserTypes = typeof UserActionsEnum

// CreateActions
export const { Types, Creators } = createActions<UserTypes, ActionTypes>({
  requestUsers: null,
  requestUsersSuccess: ['data'],
  requestUsersFailure: null,
})

export interface RequestUserSuccess {
  data: UserPagination
}

export interface UserStateType {
  pagination: UserPagination
  user: User | null
  loadings: {
    get: {
      all: boolean
      one: boolean
    }
    put: boolean
    post: boolean
    delete: boolean
  }
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE: UserStateType = Immutable({
  pagination: {
    items: null,
    links: { first: '', last: '', next: '', previous: '' },
    meta: {
      current_page: 0,
      item_count: 0,
      items_per_page: 0,
      total_items: 0,
      total_pages: 0,
    },
  },
  user: null,
  loadings: {
    delete: false,
    get: {
      all: false,
      one: false,
    },
    post: false,
    put: false,
  },
})

/* ------------- Reducers ------------- */
export const UsersRequest = (
  state: UserStateType = INITIAL_STATE,
): UserStateType => ({
  ...state,
  loadings: { ...state.loadings, get: { ...state.loadings.get, all: true } },
})

export const UsersRequestSuccess = (
  state: UserStateType = INITIAL_STATE,
  { data }: RequestUserSuccess,
): UserStateType => ({
  ...state,
  pagination: data,
  loadings: { ...state.loadings, get: { ...state.loadings.get, all: false } },
})

export const UsersRequestFailure = (
  state: UserStateType = INITIAL_STATE,
): UserStateType => ({
  ...state,
  loadings: { ...state.loadings, get: { ...state.loadings.get, all: false } },
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<UserStateType, ActionTypes>(
  INITIAL_STATE,
  {
    [Types.REQUEST_USERS]: UsersRequest,
    [Types.REQUEST_USERS_SUCCESS]: UsersRequestSuccess,
    [Types.REQUEST_USERS_FAILURE]: UsersRequestFailure,
  },
)
