import { Map } from 'immutable'
import { callAPI, login, logout, register, validateCredentials } from '../../utils'

export const VALIDATE_LOCAL_CREDENTIALS = 'VALIDATE_LOCAL_CREDENTIALS'
export function validateLocalCredentials () {
  return {
    type: VALIDATE_LOCAL_CREDENTIALS,
  }
}

export const VALIDATE_LOCAL_CREDENTIALS_SUCCESS = 'VALIDATE_LOCAL_CREDENTIALS_SUCCESS'
export function validateLocalCredentialsSuccess (user) {
  return {
    type: VALIDATE_LOCAL_CREDENTIALS_SUCCESS,
    user,
  }
}

export const VALIDATE_LOCAL_CREDENTIALS_FAILURE = 'VALIDATE_LOCAL_CREDENTIALS_FAILURE'
export function validateLocalCredentialsFailure (error) {
  return {
    type: VALIDATE_LOCAL_CREDENTIALS_FAILURE,
    error,
  }
}

export const LOGIN_USER = 'LOGIN_USER'
export function loginUser () {
  return {
    type: LOGIN_USER,
  }
}

export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export function loginUserFailure (error) {
  return {
    type: LOGIN_USER_FAILURE,
    error,
  }
}

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export function loginUserSuccess (user) {
  return {
    type: LOGIN_USER_SUCCESS,
    user,
  }
}

export const REGISTER_USER = 'REGISTER_USER'
export function registerUser () {
  return {
    type: REGISTER_USER,
  }
}

export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'
export function registerUserFailure (error) {
  return {
    type: REGISTER_USER_FAILURE,
    error
  }
}

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export function registerUserSuccess (user) {
  return {
    type: REGISTER_USER_SUCCESS,
    user,
  }
}

export const LOGOUT_USER = 'LOGOUT_USER'
export function logoutUser () {
  return {
    type: LOGOUT_USER,
  }
}

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export function logoutUserSuccess () {
  return {
    type: LOGOUT_USER_SUCCESS,
  }
}

export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE'
export function logoutUserFailure (error) {
  return {
    type: LOGOUT_USER_FAILURE,
    error,
  }
}

const initialState = Map({
  isAuthenticating: false,
  isAuthenticated: false,
  isLoggingOut: false,
  error: null,
})

export default function auth (state = initialState, action) {
  switch (action.type) {

    case LOGIN_USER :
      return state.merge({isAuthenticating: true, error: null})

    case LOGIN_USER_FAILURE :
      return state.mergeDeep({
        isAuthenticating: false,
        isAuthenticated: false,
        error: action.error,
      })

    case LOGIN_USER_SUCCESS :
      return state.merge({
        isAuthenticated: true,
        isAuthenticating: false,
        error: null,
      })

    case REGISTER_USER_SUCCESS :
      return state.merge({
        isAuthenticated: false, // difference between LOGIN_USER_SUCCESS
        isAuthenticating: false,
        error: null,
      })

    case REGISTER_USER_FAILURE :
      return state.merge({
        isAuthenticated: false,
        isAuthenticating: false,
        error: action.error,
      })

    case LOGOUT_USER :
      return state.merge({isLoggingOut: true})

    case LOGOUT_USER_FAILURE :
      return state.merge({isLoggingOut: false, error: action.error})

    case LOGOUT_USER_SUCCESS :
      return initialState

    default :
      return state
  }
}
