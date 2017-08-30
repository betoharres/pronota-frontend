import { fromJS } from 'immutable'
import { LOGOUT_USER } from './user'
import { callAPI } from '../../utils'

export const LOADING_MULTIPLE_AFFILIATES = 'LOADING_MULTIPLE_AFFILIATES'
export function loadingMultipleAffiliates () {
  return {
    type: LOADING_MULTIPLE_AFFILIATES,
  }
}

export const LOADING_MULTIPLE_AFFILIATES_SUCCESS = 'LOADING_MULTIPLE_AFFILIATES_SUCCESS'
export function loadingMultipleAffiliatesSuccess (multiplesAffiliates) {
  return {
    type: LOADING_MULTIPLE_AFFILIATES_SUCCESS,
    multiplesAffiliates,
  }
}

export const LOADING_MULTIPLE_AFFILIATES_FAILURE = 'LOADING_MULTIPLE_AFFILIATES_FAILURE'
export function loadingMultipleAffiliatesFailure (error) {
  return {
    type: LOADING_MULTIPLE_AFFILIATES_FAILURE,
    error,
  }
}

export const LOADING_AFFILIATE = 'LOADING_AFFILIATE'
export function loadingAffiliate () {
  return {
    type: LOADING_AFFILIATE,
  }
}

export const LOADING_AFFILIATE_SUCCESS = 'LOADING_AFFILIATE_SUCCESS'
export function loadingAffiliateSuccess (affiliates) {
  return {
    type: LOADING_AFFILIATE_SUCCESS,
    affiliates,
  }
}

export const LOADING_AFFILIATE_FAILURE = 'LOADING_AFFILIATE_FAILURE'
export function loadingAffiliateFailure (error) {
  return {
    type: LOADING_AFFILIATE_FAILURE,
    error,
  }
}

export const CREATING_AFFILIATE = 'CREATING_AFFILIATE'
export function creatingAffiliate () {
  return {
    type: CREATING_AFFILIATE,
  }
}

export const CREATING_AFFILIATE_SUCCESS = 'CREATING_AFFILIATE_SUCCESS'
export function creatingAffiliateSuccess (affiliates) {
  return {
    type: CREATING_AFFILIATE_SUCCESS,
    affiliates,
  }
}

export const CREATING_AFFILIATE_FAILURE = 'CREATING_AFFILIATE_FAILURE'
export function creatingAffiliateFailure (error) {
  return {
    type: CREATING_AFFILIATE_FAILURE,
    error,
  }
}

export const UPDATING_AFFILIATE = 'UPDATING_AFFILIATE'
export function updatingAffiliate () {
  return {
    type: UPDATING_AFFILIATE,
  }
}

export const UPDATING_AFFILIATE_SUCCESS = 'UPDATING_AFFILIATE_SUCCESS'
export function updatingAffiliateSuccess (affiliates) {
  return {
    type: UPDATING_AFFILIATE_SUCCESS,
    affiliates
  }
}

export const UPDATING_AFFILIATE_FAILURE = 'UPDATING_AFFILIATE_FAILURE'
export function updatingAffiliateFailure (error) {
  return {
    type: UPDATING_AFFILIATE_FAILURE,
    error,
  }
}

export const DESTROYING_AFFILIATE = 'DESTROYING_AFFILIATE'
export function destroyingAffiliate () {
  return {
    type: DESTROYING_AFFILIATE,
  }
}

export const DESTROYING_AFFILIATE_SUCCESS = 'DESTROYING_AFFILIATE_SUCCESS'
export function destroyingAffiliateSuccess (affiliatesId) {
  return {
    type: DESTROYING_AFFILIATE_SUCCESS,
    affiliatesId,
  }
}

export const DESTROYING_AFFILIATE_FAILURE = 'DESTROYING_AFFILIATE_FAILURE'
export function destroyingAffiliateFailure (error) {
  return {
    type: DESTROYING_AFFILIATE_FAILURE,
    error,
  }
}

export function fetchAndHandleMultipleAffiliates (currentSubdomain) {
  return async function (dispatch, getState) {
    dispatch(loadingMultipleAffiliates())
    try {
      const multiplesAffiliates = await callAPI('/filiais', currentSubdomain)
      dispatch(loadingMultipleAffiliatesSuccess(multiplesAffiliates))
    } catch (e) {
      dispatch(loadingMultipleAffiliatesFailure(e))
    }
  }
}

export function fetchAndHandleAffiliate (currentSubdomain, affiliatesId) {
  return async function (dispatch, getState) {
    dispatch(loadingAffiliate())
    try {
      const affiliates = await callAPI(`/filiais/${affiliatesId}`, currentSubdomain)
      dispatch(loadingAffiliateSuccess(affiliates))
      return affiliates
    } catch (e) {
      dispatch(loadingAffiliateFailure(e))
      return null
    }
  }
}

export function handleCreateAffiliate (currentSubdomain, newAffiliate) {
  return async function (dispatch, getState) {
    dispatch(creatingAffiliate())
    try {
      const createdAffiliate = await callAPI('/filiais', currentSubdomain, 'POST', newAffiliate)
      dispatch(creatingAffiliateSuccess(createdAffiliate))
    } catch (e) {
      console.warn(e)
      dispatch(creatingAffiliateFailure(e))
    }
  }
}

export function handleUpdateAffiliate (currentSubdomain, affiliatesId, newAffiliate) {
  return async function (dispatch, getState) {
    dispatch(updatingAffiliate())
    try {
      const updatedAffiliate = await callAPI(`/filiais/${affiliatesId}`,
                                        currentSubdomain, 'PUT', newAffiliate)
      dispatch(updatingAffiliateSuccess(updatedAffiliate))
    } catch (e) {
      dispatch(updatingAffiliateFailure(e))
    }
  }
}

export function handleDestroyAffiliate (currentSubdomain, affiliatesId) {
  return async function (dispatch, getState) {
    dispatch(destroyingAffiliate())
    try {
      await callAPI(`/filiais/${affiliatesId}`, currentSubdomain, 'DELETE')
      dispatch(destroyingAffiliateSuccess(affiliatesId))
      return true
    } catch (e) {
      dispatch(destroyingAffiliateFailure(e))
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

export default function affiliatess (state = initialState, action) {
  switch (action.type) {

    case LOADING_MULTIPLE_AFFILIATES :
    case LOADING_AFFILIATE :
    case CREATING_AFFILIATE :
    case UPDATING_AFFILIATE :
      return state.mergeIn(['status', 'isLoading'], true)

    case LOADING_MULTIPLE_AFFILIATES_FAILURE :
    case LOADING_AFFILIATE_FAILURE :
    case CREATING_AFFILIATE_FAILURE :
    case UPDATING_AFFILIATE_FAILURE :
    case DESTROYING_AFFILIATE_FAILURE :
      return state.mergeIn(['status', 'errors'], action.error)

    case LOADING_MULTIPLE_AFFILIATES_SUCCESS :
      action.multiplesAffiliates.forEach((affiliates) => {
        state = state.merge({[affiliates.id]: affiliates})
      })
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        }
      })

    case LOADING_AFFILIATE_SUCCESS :
    case CREATING_AFFILIATE_SUCCESS :
    case UPDATING_AFFILIATE_SUCCESS :
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        },
        [action.affiliates.id]: action.affiliates
      })

    case DESTROYING_AFFILIATE_SUCCESS :
      state = state.delete(action.affiliatesId)
      return state.mergeDeep({status: {isLoading: false, errors: ''}})

    case LOGOUT_USER :
      return initialState

    default :
      return state
  }
}
