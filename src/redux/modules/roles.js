import { fromJS } from 'immutable'
import { callAPI } from '../../utils'

export const LOADING_MULTIPLE_ROLES = 'LOADING_MULTIPLE_ROLES'
export function loadingMultipleRoles () {
  return {
    type: LOADING_MULTIPLE_ROLES,
  }
}

export const LOADING_MULTIPLE_ROLES_SUCCESS = 'LOADING_MULTIPLE_ROLES_SUCCESS'
export function loadingMultipleRolesSuccess (multiplesRoles) {
  return {
    type: LOADING_MULTIPLE_ROLES_SUCCESS,
    multiplesRoles,
  }
}

export const LOADING_MULTIPLE_ROLES_FAILURE = 'LOADING_MULTIPLE_ROLES_FAILURE'
export function loadingMultipleRolesFailure (error) {
  return {
    type: LOADING_MULTIPLE_ROLES_FAILURE,
    error,
  }
}

export const LOADING_ROLE = 'LOADING_ROLE'
export function loadingRole () {
  return {
    type: LOADING_ROLE,
  }
}

export const LOADING_ROLE_SUCCESS = 'LOADING_ROLE_SUCCESS'
export function loadingRoleSuccess (role) {
  return {
    type: LOADING_ROLE_SUCCESS,
    role,
  }
}

export const LOADING_ROLE_FAILURE = 'LOADING_ROLE_FAILURE'
export function loadingRoleFailure (error) {
  return {
    type: LOADING_ROLE_FAILURE,
    error,
  }
}

export const CREATING_ROLE = 'CREATING_ROLE'
export function creatingRole () {
  return {
    type: CREATING_ROLE,
  }
}

export const CREATING_ROLE_SUCCESS = 'CREATING_ROLE_SUCCESS'
export function creatingRoleSuccess (role) {
  return {
    type: CREATING_ROLE_SUCCESS,
    role,
  }
}

export const CREATING_ROLE_FAILURE = 'CREATING_ROLE_FAILURE'
export function creatingRoleFailure (error) {
  return {
    type: CREATING_ROLE_FAILURE,
    error,
  }
}

export const UPDATING_ROLE = 'UPDATING_ROLE'
export function updatingRole () {
  return {
    type: UPDATING_ROLE,
  }
}

export const UPDATING_ROLE_SUCCESS = 'UPDATING_ROLE_SUCCESS'
export function updatingRoleSuccess (role) {
  return {
    type: UPDATING_ROLE_SUCCESS,
    role
  }
}

export const UPDATING_ROLE_FAILURE = 'UPDATING_ROLE_FAILURE'
export function updatingRoleFailure (error) {
  return {
    type: UPDATING_ROLE_FAILURE,
    error,
  }
}

export const DESTROYING_ROLE = 'DESTROYING_ROLE'
export function destroyingRole () {
  return {
    type: DESTROYING_ROLE,
  }
}

export const DESTROYING_ROLE_SUCCESS = 'DESTROYING_ROLE_SUCCESS'
export function destroyingRoleSuccess (roleId) {
  return {
    type: DESTROYING_ROLE_SUCCESS,
    roleId,
  }
}

export const DESTROYING_ROLE_FAILURE = 'DESTROYING_ROLE_FAILURE'
export function destroyingRoleFailure (error) {
  return {
    type: DESTROYING_ROLE_FAILURE,
    error,
  }
}

export function fetchAndHandleMultipleRoles (currentSubdomain) {
  return async function (dispatch, getState) {
    dispatch(loadingMultipleRoles())
    try {
      const multiplesRoles = await callAPI('/roles', currentSubdomain)
      dispatch(loadingMultipleRolesSuccess(multiplesRoles))
    } catch (e) {
      console.log(e)
      dispatch(loadingMultipleRolesFailure(e))
    }
  }
}

export function fetchAndHandleRole (currentSubdomain, roleId) {
  return async function (dispatch, getState) {
    dispatch(loadingRole())
    try {
      const role = await callAPI(`/roles/${roleId}`, currentSubdomain)
      dispatch(loadingRoleSuccess(role))
      return role
    } catch (e) {
      dispatch(loadingRoleFailure(e))
      return null
    }
  }
}

export function handleCreateRole (currentSubdomain, newRole) {
  return async function (dispatch, getState) {
    dispatch(creatingRole())
    try {
      const createdRole = await callAPI('/roles', currentSubdomain, 'POST', newRole)
      dispatch(creatingRoleSuccess(createdRole))
    } catch (e) {
      dispatch(creatingRoleFailure(e))
    }
  }
}

export function handleUpdateRole (currentSubdomain, roleId, newRole) {
  return async function (dispatch, getState) {
    dispatch(updatingRole())
    try {
      const updatedRole = await callAPI(`/roles/${roleId}`, currentSubdomain, 'PUT', newRole)
      dispatch(updatingRoleSuccess(updatedRole))
    } catch (e) {
      dispatch(updatingRoleFailure(e))
    }
  }
}

export function handleDestroyRole (currentSubdomain, roleId) {
  return async function (dispatch, getState) {
    dispatch(destroyingRole())
    try {
      await callAPI(`/roles/${roleId}`, currentSubdomain, 'DELETE')
      dispatch(destroyingRoleSuccess(roleId))
      return true
    } catch (e) {
      dispatch(destroyingRoleFailure(e))
      return false
    }
  }
}

const initialState = fromJS({
  status: {
    isLoading: false,
    errors: '',
    lastUpdated: 0,
  }
})

export default function roles (state = initialState, action) {
  switch (action.type) {

    case LOADING_MULTIPLE_ROLES :
    case LOADING_ROLE :
    case CREATING_ROLE :
    case UPDATING_ROLE :
      return state.mergeIn(['status', 'isLoading'], true)

    case LOADING_MULTIPLE_ROLES_FAILURE :
    case LOADING_ROLE_FAILURE :
    case CREATING_ROLE_FAILURE :
    case UPDATING_ROLE_FAILURE :
    case DESTROYING_ROLE_FAILURE :
      return state.mergeIn(['status', 'errors'], action.error)

    case LOADING_MULTIPLE_ROLES_SUCCESS :
      action.multiplesRoles.forEach((role) => {
        state = state.merge({[role.id]: role})
      })
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        }
      })

    case LOADING_ROLE_SUCCESS :
    case CREATING_ROLE_SUCCESS :
    case UPDATING_ROLE_SUCCESS :
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        },
        [action.role.id]: action.role
      })

    case DESTROYING_ROLE_SUCCESS :
      state = state.delete(action.roleId)
      return state.mergeDeep({status: {isLoading: false, errors: ''}})

    default :
      return state
  }
}
