import { Action } from 'redux'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { UserPagination, User, UserGetQuery, CreateUser } from '@/types'

/* ------------- Types and Action Creators ------------- */

export enum UserActionsEnum {
  REQUEST_USERS = 'REQUEST_USERS',
  REQUEST_USERS_SUCCESS = 'REQUEST_USERS_SUCCESS',
  REQUEST_USERS_FAILURE = 'REQUEST_USERS_FAILURE',

  DELETE_USER = 'DELETE_USER',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = 'DELETE_USER_FAILURE',

  CREATE_USER = 'CREATE_USER',
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE = 'CREATE_USER_FAILURE',

  SET_CONFIRM_MODAL_STATE = 'SET_CONFIRM_MODAL_STATE',
  SET_CREATE_MODAL_STATE = 'SET_CREATE_MODAL_STATE',
}

export interface ActionTypes extends Action<UserActionsEnum> {
  requestUsers: (query: UserGetQuery) => Action
  requestUsersSuccess: (data: UserPagination) => Action
  requestUsersFailure: () => Action
  deleteUser: (id: string) => Action
  deleteUserSuccess: () => Action
  deleteUserFailure: () => Action
  setConfirmModalState: (action: boolean) => Action
  setCreateModalState: (action: boolean) => Action
  createUser: (user: CreateUser) => Action
  createUserSuccess: () => Action
  createUserFailure: () => Action
}

type UserTypes = typeof UserActionsEnum

// CreateActions
export const { Types, Creators } = createActions<UserTypes, ActionTypes>({
  requestUsers: ['query'],
  requestUsersSuccess: ['data'],
  requestUsersFailure: null,
  deleteUser: ['id'],
  deleteUserSuccess: null,
  deleteUserFailure: null,
  setConfirmModalState: ['value'],
  setCreateModalState: ['value'],
  createUser: ['user'],
  createUserSuccess: null,
  createUserFailure: null,
})

export interface RequestUser {
  query: UserGetQuery
}

export interface DeleteUser {
  id: string
}

export interface RequestUserSuccess {
  data: UserPagination
}

export interface SetModalState {
  value: boolean
}

export interface CreateUserRequest {
  user: CreateUser
}

export interface UserStateType {
  pagination: UserPagination
  user: User | null
  confirmModalIsOpen: boolean
  createModalIsOpen: boolean

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
  confirmModalIsOpen: false,
  createModalIsOpen: true,
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

export const DeleteUser = (
  state: UserStateType = INITIAL_STATE,
): UserStateType => ({
  ...state,
  loadings: { ...state.loadings, delete: true },
})

export const DeleteUserSuccess = (
  state: UserStateType = INITIAL_STATE,
): UserStateType => ({
  ...state,
  confirmModalIsOpen: false,
  loadings: { ...state.loadings, delete: false },
})

export const DeleteUserFailure = (
  state: UserStateType = INITIAL_STATE,
): UserStateType => ({
  ...state,
  loadings: { ...state.loadings, delete: false },
})

export const SetConfirmModalState = (
  state: UserStateType = INITIAL_STATE,
  { value }: SetModalState,
): UserStateType => ({
  ...state,
  createModalIsOpen: value,
})

export const SetCreateModalState = (
  state: UserStateType = INITIAL_STATE,
  { value }: SetModalState,
): UserStateType => ({
  ...state,
  createModalIsOpen: value,
})

export const CreateUserRequest = (
  state: UserStateType = INITIAL_STATE,
): UserStateType => ({
  ...state,
  loadings: { ...state.loadings, post: true },
})

export const CreateUserRequestSuccess = (
  state: UserStateType = INITIAL_STATE,
): UserStateType => ({
  ...state,
  createModalIsOpen: false,
  loadings: { ...state.loadings, post: false },
})

export const CreateUserRequestFailure = (
  state: UserStateType = INITIAL_STATE,
): UserStateType => ({
  ...state,
  loadings: { ...state.loadings, post: false },
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<UserStateType, ActionTypes>(
  INITIAL_STATE,
  {
    [Types.REQUEST_USERS]: UsersRequest,
    [Types.REQUEST_USERS_SUCCESS]: UsersRequestSuccess,
    [Types.REQUEST_USERS_FAILURE]: UsersRequestFailure,
    [Types.DELETE_USER]: DeleteUser,
    [Types.DELETE_USER_SUCCESS]: DeleteUserSuccess,
    [Types.DELETE_USER_FAILURE]: DeleteUserFailure,
    [Types.SET_CONFIRM_MODAL_STATE]: SetConfirmModalState,
    [Types.SET_CREATE_MODAL_STATE]: SetCreateModalState,
    [Types.CREATE_USER]: CreateUserRequest,
    [Types.CREATE_USER_SUCCESS]: CreateUserRequestSuccess,
    [Types.CREATE_USER_FAILURE]: CreateUserRequestFailure,
  },
)
