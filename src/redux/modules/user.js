import { fromJS } from 'immutable'
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

const initialState = fromJS({
  currentSubdomain: '',
  currentCompanyName: '',
  currentCompanyId: null,
  isAuthenticating: false,
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
    info: {
      name: '',
    },
  },
})

export function authenticate (credentials) {
  return async function (dispatch) {
    const email = credentials.get('email')
    const password = credentials.get('password')
    dispatch(loginUser())
    try {
      const user = await login(email, password)
      dispatch(loginUserSuccess(user))
      return user
    } catch (e) {
      dispatch(loginUserFailure(e))
      return null
    }
  }
}

export function validateLocalCredentials () {
  return async function (dispatch) {
    try {
      dispatch(loginUser())
      const user = await validateCredentials()
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
      await logout()
      dispatch(logoutUser())
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
}

export function fetchAndHandleUserRole (currentSubdomain) {
  return async function (dispatch) {
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

export default function user (state = initialState, action) {
  switch (action.type) {

    case LOGIN_USER :
      return state.mergeDeep({isAuthenticating: true, error: null})

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
      return initialState

    default:
      return state
  }
}
