import { fromJS } from 'immutable'
import { fetchAndHandleMultipleCompanies } from './companies'
import { callAPI, login, logout, register, validateCredentials } from '../../utils'

export const SET_USER_CURRENT_SUBDOMAIN = 'SET_USER_CURRENT_SUBDOMAIN'
export const CLEAR_USER_CURRENT_SUBDOMAIN = 'CLEAR_USER_CURRENT_SUBDOMAIN'

export const LOADING_USER_ROLE = 'LOADING_USER_ROLE'
export const LOADING_USER_ROLE_SUCCESS = 'LOADING_USER_ROLE_SUCCESS'
export const LOADING_USER_ROLE_FAILURE = 'LOADING_USER_ROLE_FAILURE'

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

export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE'
export function logoutUserFailure (error) {
  return {
    type: LOGOUT_USER_FAILURE,
    error,
  }
}

export function setUserCurrentSubdomain (subdomain, companyName, companyId) {
  return {
    type: SET_USER_CURRENT_SUBDOMAIN,
    subdomain,
    companyName,
    companyId,
  }
}

export function clearUserCurrentSubdomain () {
  return {
    type: CLEAR_USER_CURRENT_SUBDOMAIN,
  }
}

export function loadingUserRole () {
  return {
    type: LOADING_USER_ROLE,
  }
}

export function loadingUserRoleSuccess (role) {
  return {
    type: LOADING_USER_ROLE_SUCCESS,
    role,
  }
}

export function loadingUserRoleFailure (error) {
  return {
    type: LOADING_USER_ROLE_FAILURE,
    error,
  }
}

export const LOADING_DELETE_USER = 'LOADING_DELETE_USER'
export function loadingDeleteUser () {
  return {
    type: LOADING_DELETE_USER,
  }
}

export const LOADING_DELETE_USER_SUCCESS = 'LOADING_DELETE_USER_SUCCESS'
export function loadingDeleteUserSuccess () {
  return {
    type: LOADING_DELETE_USER_SUCCESS,
  }
}

export const LOADING_DELETE_USER_FAILURE = 'LOADING_DELETE_USER_FAILURE'
export function loadingDeleteUserFailure (error) {
  return {
    type: LOADING_DELETE_USER_FAILURE,
    error,
  }
}

const initialState = fromJS({
  currentSubdomain: null,
  currentCompanyName: '',
  currentCompanyId: null,
  isAuthenticating: true,
  isAuthenticated: false,
  error: null,
  info: {
    isLoading: false,
    error: '',
    lastUpdated: 0,
  },
  role: {
    isLoading: false,
    error: '',
    lastUpdated: 0,
    info: {},
  },
})

export function authenticate (credentials) {
  return async function (dispatch) {
    const email = credentials.get('email')
    const password = credentials.get('password')
    dispatch(loginUser())
    try {
      const user = await login(email, password)
      if (user) { await dispatch(fetchAndHandleMultipleCompanies()) }
      dispatch(loginUserSuccess(user))
      return user
    } catch (e) {
      dispatch(loginUserFailure(e))
      return null
    }
  }
}

export function loginLocalCredentials () {
  return async function (dispatch) {
    try {
      dispatch(loginUser())
      const user = await validateCredentials()
      if (user) { await dispatch(fetchAndHandleMultipleCompanies()) }
      dispatch(loginUserSuccess(user))
      return user
    } catch (e) {
      dispatch(loginUserFailure(e))
      return null
    }
  }
}

export function handleRegisterUser (credentials) {
  return async function (dispatch) {
    try {
      const newUser = await register(
        credentials.get('email'),
        credentials.get('password'),
        credentials.get('password_confirmation'))
      dispatch(registerUserSuccess(newUser))
      return newUser
    } catch (e) {
      dispatch(registerUserFailure(e))
      return false
    }
  }
}

export function requestLogoutUser () {
  return async function (dispatch) {
    try {
      dispatch(loginUser())
      await logout()
      dispatch(logoutUser())
      return true
    } catch (e) {
      dispatch(logoutUserFailure(e))
      return false
    }
  }
}

export function fetchAndHandleUserRole () {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(loadingUserRole())
    try {
      const userRole = await callAPI('/user_role', currentSubdomain)
      dispatch(loadingUserRoleSuccess(userRole))
      return userRole
    } catch (e) {
      dispatch(loadingUserRoleFailure(e))
      return null
    }
  }
}

export function handleDeleteUser () {
  return async function (dispatch, getState) {
    dispatch(loadingDeleteUser())
    try {
      await callAPI('/user', '', 'DELETE')
      dispatch(clearUserCurrentSubdomain())
      dispatch(logoutUser())
      dispatch(loadingUserRoleSuccess())
    } catch (e) {
      dispatch(loadingDeleteUserFailure(e))
    }
  }
}

export default function user (state = initialState, action) {
  switch (action.type) {

    case LOGIN_USER :
      return state.mergeDeep({isAuthenticating: true, error: null})

    case LOADING_DELETE_USER_FAILURE :
      return state.mergeDeep({error: action.error})


    case LOGIN_USER_FAILURE :
      return state.mergeDeep({
        isAuthenticating: false,
        isAuthenticated: false,
        error: action.error,
      })

    case LOGIN_USER_SUCCESS :
      state = state.merge({
        info: action.user
      })
      return state.mergeDeep({
        isAuthenticated: true,
        isAuthenticating: false,
        error: null,
      })

    case REGISTER_USER_SUCCESS :
      state = state.merge({
        info: action.user
      })
      return state.mergeDeep({
        isAuthenticated: false, // difference between LOGIN_USER_SUCCESS
        isAuthenticating: false,
        error: null,
      })

    case REGISTER_USER_FAILURE :
      state = state.merge({error: action.error})
      return state.mergeDeep({
        isAuthenticated: false,
        isAuthenticating: false,
        error: action.error,
        info: {
          isLoading: false,
          error: '',
        }
      })

    case SET_USER_CURRENT_SUBDOMAIN :
      return state.merge({
        currentSubdomain: action.subdomain,
        currentCompanyName: action.companyName,
        currentCompanyId: action.companyId,
      })

    case LOADING_USER_ROLE :
      return state.mergeIn(['role', 'isLoading'], true)

    case LOADING_USER_ROLE_SUCCESS :
      return state.mergeDeep({
        role: {
          isLoading: false,
          error: '',
          lastUpdated: new Date().getTime(),
          info: {
            name: action.role.name
          },
        }
      })

    case LOADING_USER_ROLE_FAILURE :
      return state.mergeDeep({
        role: {
          isLoading: false,
          error: action.error,
        }
      })

    case CLEAR_USER_CURRENT_SUBDOMAIN :
      return state.merge({
        currentCompanyName: '',
        currentSubdomain: '',
        role: {
          isLoading: false,
          error: '',
          lastUpdated: 0,
          info: {
            name: '',
          },
        }})

    case LOGOUT_USER :
    case LOADING_DELETE_USER_SUCCESS :
      state = initialState
      return state.merge({isAuthenticating: false})

    default:
      return state
  }
}
