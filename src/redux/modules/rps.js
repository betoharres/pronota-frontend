import { fromJS } from 'immutable'
import { LOGOUT_USER, SET_USER_CURRENT_SUBDOMAIN } from './user'
import { callAPI } from '../../utils'

export const LOADING_MULTIPLE_RPS = 'LOADING_MULTIPLE_RPS'
export function loadingMultipleRps () {
  return {
    type: LOADING_MULTIPLE_RPS,
  }
}

export const LOADING_MULTIPLE_RPS_SUCCESS = 'LOADING_MULTIPLE_RPS_SUCCESS'
export function loadingMultipleRpsSuccess (multiplesRps) {
  return {
    type: LOADING_MULTIPLE_RPS_SUCCESS,
    multiplesRps,
  }
}

export const LOADING_MULTIPLE_RPS_FAILURE = 'LOADING_MULTIPLE_RPS_FAILURE'
export function loadingMultipleRpsFailure (error) {
  return {
    type: LOADING_MULTIPLE_RPS_FAILURE,
    error,
  }
}

export const LOADING_RPS = 'LOADING_RPS'
export function loadingRps () {
  return {
    type: LOADING_RPS,
  }
}

export const LOADING_RPS_SUCCESS = 'LOADING_RPS_SUCCESS'
export function loadingRpsSuccess (rps) {
  return {
    type: LOADING_RPS_SUCCESS,
    rps,
  }
}

export const LOADING_RPS_FAILURE = 'LOADING_RPS_FAILURE'
export function loadingRpsFailure (error) {
  return {
    type: LOADING_RPS_FAILURE,
    error,
  }
}

export const CREATING_RPS = 'CREATING_RPS'
export function creatingRps () {
  return {
    type: CREATING_RPS,
  }
}

export const CREATING_RPS_SUCCESS = 'CREATING_RPS_SUCCESS'
export function creatingRpsSuccess (rps) {
  return {
    type: CREATING_RPS_SUCCESS,
    rps,
  }
}

export const CREATING_RPS_FAILURE = 'CREATING_RPS_FAILURE'
export function creatingRpsFailure (error) {
  return {
    type: CREATING_RPS_FAILURE,
    error,
  }
}

export const UPDATING_RPS = 'UPDATING_RPS'
export function updatingRps () {
  return {
    type: UPDATING_RPS,
  }
}

export const UPDATING_RPS_SUCCESS = 'UPDATING_RPS_SUCCESS'
export function updatingRpsSuccess (rps) {
  return {
    type: UPDATING_RPS_SUCCESS,
    rps
  }
}

export const UPDATING_RPS_FAILURE = 'UPDATING_RPS_FAILURE'
export function updatingRpsFailure (error) {
  return {
    type: UPDATING_RPS_FAILURE,
    error,
  }
}

export const DESTROYING_RPS = 'DESTROYING_RPS'
export function destroyingRps () {
  return {
    type: DESTROYING_RPS,
  }
}

export const DESTROYING_RPS_SUCCESS = 'DESTROYING_RPS_SUCCESS'
export function destroyingRpsSuccess (rpsId) {
  return {
    type: DESTROYING_RPS_SUCCESS,
    rpsId,
  }
}

export const DESTROYING_RPS_FAILURE = 'DESTROYING_RPS_FAILURE'
export function destroyingRpsFailure (error) {
  return {
    type: DESTROYING_RPS_FAILURE,
    error,
  }
}

export const SIGNING_RPS = 'SIGNING_RPS'
export function signingRps (rpsId) {
  return {
    type: SIGNING_RPS,
    rpsId,
  }
}

export const SIGNING_RPS_SUCCESS = 'SIGNING_RPS_SUCCESS'
export function signingRpsSuccess (rpsId, rps) {
  return {
    type: SIGNING_RPS_SUCCESS,
    rpsId,
    rps,
  }
}

export const SIGNING_RPS_FAILURE = 'SIGNING_RPS_FAILURE'
export function signedRpsFailure (error) {
  return {
    type: SIGNING_RPS_FAILURE,
    error,
  }
}

export const CLEAR_RPS_ERRORS = 'CLEAR_RPS_ERRORS'
export function clearRpsErrors () {
  return {
    type: CLEAR_RPS_ERRORS,
  }
}

export function fetchPDF (rpsId, currentSubdomain) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(loadingRps())
    try {
      const rpsPDF = await callAPI(
        `/rps/${rpsId}.pdf`,
        currentSubdomain,
        'GET',
        undefined,
        {'Content-Type': 'application/pdf'}
      )
      const blob = new Blob([rpsPDF], { type: 'application/pdf' })
      const URL = window.URL || window.webkitURL
      const downloadURL = URL.createObjectURL(blob)
      return downloadURL
    } catch (e) {
      dispatch(loadingMultipleRpsFailure(e))
      return null
    }
  }
}

export function fetchAndHandleMultipleRps () {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(loadingMultipleRps())
    try {
      const multiplesRps = await callAPI('/rps', currentSubdomain)
      dispatch(loadingMultipleRpsSuccess(multiplesRps))
      return multiplesRps
    } catch (e) {
      dispatch(loadingMultipleRpsFailure(e))
      return null
    }
  }
}

export function fetchAndHandleRps (rpsId) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(loadingRps())
    try {
      const rps = await callAPI(`/rps/${rpsId}.json`, currentSubdomain)
      dispatch(loadingRpsSuccess(rps))
      return rps
    } catch (e) {
      dispatch(loadingRpsFailure(e))
      return null
    }
  }
}

export function handleCreateRps (newRps) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(creatingRps())
    try {
      const createdRps = await callAPI('/rps', currentSubdomain, 'POST', newRps)
      dispatch(creatingRpsSuccess(createdRps))
      return createdRps
    } catch (e) {
      dispatch(creatingRpsFailure(e))
      return null
    }
  }
}

export function handleUpdateRps (rpsId, newRps) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(updatingRps())
    try {
      const updatedRps =
        await callAPI(`/rps/${rpsId}`, currentSubdomain, 'PUT', newRps)
      dispatch(updatingRpsSuccess(updatedRps))
      return updatedRps
    } catch (e) {
      dispatch(updatingRpsFailure(e))
      return null
    }
  }
}

export function handleDestroyRps (rpsId) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(destroyingRps())
    try {
      await callAPI(`/rps/${rpsId}`, currentSubdomain, 'DELETE')
      dispatch(destroyingRpsSuccess(rpsId))
      return true
    } catch (e) {
      dispatch(destroyingRpsFailure(e))
      return false
    }
  }
}

export function signRps (rpsId, certificateId, password) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    const signBody = fromJS({sign: {rpsId, certificateId, password}})
    dispatch(signingRps())
    try {
      const signedRps =
        await callAPI('/sign_rps', currentSubdomain, 'POST', signBody)
      dispatch(signingRpsSuccess(rpsId, signedRps))
      return signedRps
    } catch (e) {
      dispatch(signedRpsFailure(e))
      return false
    }
  }
}

const initialState = fromJS({
  status: {
    isLoading: false,
    errors: null,
    lastUpdated: 0,
  }
})

export default function rps (state = initialState, action) {
  switch (action.type) {

    case LOADING_MULTIPLE_RPS :
    case LOADING_RPS :
    case CREATING_RPS :
    case UPDATING_RPS :
    case SIGNING_RPS :
      return state.mergeIn(['status', 'isLoading'], true)

    case LOADING_MULTIPLE_RPS_FAILURE :
    case LOADING_RPS_FAILURE :
    case CREATING_RPS_FAILURE :
    case UPDATING_RPS_FAILURE :
    case DESTROYING_RPS_FAILURE :
    case SIGNING_RPS_FAILURE :
      return state.mergeIn(['status', 'errors'], action.error)

    case LOADING_MULTIPLE_RPS_SUCCESS :
      action.multiplesRps.forEach((rps) => {
        state = state.merge({[rps.id]: rps})
      })
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        }
      })

    case SIGNING_RPS_SUCCESS :
    case LOADING_RPS_SUCCESS :
    case CREATING_RPS_SUCCESS :
    case UPDATING_RPS_SUCCESS :
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        },
        [action.rps.id]: action.rps
      })

    case DESTROYING_RPS_SUCCESS :
      state = state.delete(action.rpsId.toString())
      return state.mergeDeep({status: {isLoading: false, errors: null}})

    case CLEAR_RPS_ERRORS :
      return state.mergeDeep({status: {errors: null}})

    case SET_USER_CURRENT_SUBDOMAIN :
    case LOGOUT_USER :
      return initialState

    default :
      return state
  }
}
