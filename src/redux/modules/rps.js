import { fromJS } from 'immutable'
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

export function fetchAndHandleMultipleRps (currentSubdomain) {
  return async function (dispatch, getState) {
    dispatch(loadingMultipleRps())
    try {
      const multiplesRps = await callAPI('/rps', currentSubdomain)
      dispatch(loadingMultipleRpsSuccess(multiplesRps))
    } catch (e) {
      dispatch(loadingMultipleRpsFailure(e))
    }
  }
}

export function fetchAndHandleRps (currentSubdomain, rpsId) {
  return async function (dispatch, getState) {
    dispatch(loadingRps())
    try {
      const rps = await callAPI(`/rps/${rpsId}`, currentSubdomain)
      dispatch(loadingRpsSuccess(rps))
      return rps
    } catch (e) {
      dispatch(loadingRpsFailure(e))
      return null
    }
  }
}

export function handleCreateRps (currentSubdomain, newRps) {
  return async function (dispatch, getState) {
    dispatch(creatingRps())
    try {
      const createdRps = await callAPI('/rps', currentSubdomain, 'POST', newRps)
      dispatch(creatingRpsSuccess(createdRps))
    } catch (e) {
      dispatch(creatingRpsFailure(e))
    }
  }
}

export function handleUpdateRps (currentSubdomain, rpsId, newRps) {
  return async function (dispatch, getState) {
    dispatch(updatingRps())
    try {
      const updatedRps = await callAPI(`/rps/${rpsId}`, currentSubdomain, 'PUT', newRps)
      dispatch(updatingRpsSuccess(updatedRps))
    } catch (e) {
      dispatch(updatingRpsFailure(e))
    }
  }
}

export function handleDestroyRps (currentSubdomain, rpsId) {
  return async function (dispatch, getState) {
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

const initialState = fromJS({
  status: {
    isLoading: false,
    errors: '',
    lastUpdated: 0,
  }
})

export default function rps (state = initialState, action) {
  switch (action.type) {

    case LOADING_MULTIPLE_RPS :
    case LOADING_RPS :
    case CREATING_RPS :
    case UPDATING_RPS :
      return state.mergeIn(['status', 'isLoading'], true)

    case LOADING_MULTIPLE_RPS_FAILURE :
    case LOADING_RPS_FAILURE :
    case CREATING_RPS_FAILURE :
    case UPDATING_RPS_FAILURE :
    case DESTROYING_RPS_FAILURE :
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
      state = state.delete(action.rpsId)
      return state.mergeDeep({status: {isLoading: false, errors: ''}})

    default :
      return state
  }
}
