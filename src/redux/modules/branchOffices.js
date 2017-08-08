import { fromJS } from 'immutable'
import { callAPI } from '../../utils'

export const LOADING_MULTIPLE_BRANCH_OFFICES = 'LOADING_MULTIPLE_BRANCH_OFFICES'
export function loadingMultipleBranchOffices () {
  return {
    type: LOADING_MULTIPLE_BRANCH_OFFICES,
  }
}

export const LOADING_MULTIPLE_BRANCH_OFFICES_SUCCESS = 'LOADING_MULTIPLE_BRANCH_OFFICES_SUCCESS'
export function loadingMultipleBranchOfficesSuccess (multiplesBranchOffices) {
  return {
    type: LOADING_MULTIPLE_BRANCH_OFFICES_SUCCESS,
    multiplesBranchOffices,
  }
}

export const LOADING_MULTIPLE_BRANCH_OFFICES_FAILURE = 'LOADING_MULTIPLE_BRANCH_OFFICES_FAILURE'
export function loadingMultipleBranchOfficesFailure (error) {
  return {
    type: LOADING_MULTIPLE_BRANCH_OFFICES_FAILURE,
    error,
  }
}

export const LOADING_BRANCH_OFFICE = 'LOADING_BRANCH_OFFICE'
export function loadingBranchOffice () {
  return {
    type: LOADING_BRANCH_OFFICE,
  }
}

export const LOADING_BRANCH_OFFICE_SUCCESS = 'LOADING_BRANCH_OFFICE_SUCCESS'
export function loadingBranchOfficeSuccess (branchOffice) {
  return {
    type: LOADING_BRANCH_OFFICE_SUCCESS,
    branchOffice,
  }
}

export const LOADING_BRANCH_OFFICE_FAILURE = 'LOADING_BRANCH_OFFICE_FAILURE'
export function loadingBranchOfficeFailure (error) {
  return {
    type: LOADING_BRANCH_OFFICE_FAILURE,
    error,
  }
}

export const CREATING_BRANCH_OFFICE = 'CREATING_BRANCH_OFFICE'
export function creatingBranchOffice () {
  return {
    type: CREATING_BRANCH_OFFICE,
  }
}

export const CREATING_BRANCH_OFFICE_SUCCESS = 'CREATING_BRANCH_OFFICE_SUCCESS'
export function creatingBranchOfficeSuccess (branchOffice) {
  return {
    type: CREATING_BRANCH_OFFICE_SUCCESS,
    branchOffice,
  }
}

export const CREATING_BRANCH_OFFICE_FAILURE = 'CREATING_BRANCH_OFFICE_FAILURE'
export function creatingBranchOfficeFailure (error) {
  return {
    type: CREATING_BRANCH_OFFICE_FAILURE,
    error,
  }
}

export const UPDATING_BRANCH_OFFICE = 'UPDATING_BRANCH_OFFICE'
export function updatingBranchOffice () {
  return {
    type: UPDATING_BRANCH_OFFICE,
  }
}

export const UPDATING_BRANCH_OFFICE_SUCCESS = 'UPDATING_BRANCH_OFFICE_SUCCESS'
export function updatingBranchOfficeSuccess (branchOffice) {
  return {
    type: UPDATING_BRANCH_OFFICE_SUCCESS,
    branchOffice
  }
}

export const UPDATING_BRANCH_OFFICE_FAILURE = 'UPDATING_BRANCH_OFFICE_FAILURE'
export function updatingBranchOfficeFailure (error) {
  return {
    type: UPDATING_BRANCH_OFFICE_FAILURE,
    error,
  }
}

export const DESTROYING_BRANCH_OFFICE = 'DESTROYING_BRANCH_OFFICE'
export function destroyingBranchOffice () {
  return {
    type: DESTROYING_BRANCH_OFFICE,
  }
}

export const DESTROYING_BRANCH_OFFICE_SUCCESS = 'DESTROYING_BRANCH_OFFICE_SUCCESS'
export function destroyingBranchOfficeSuccess (branchOfficeId) {
  return {
    type: DESTROYING_BRANCH_OFFICE_SUCCESS,
    branchOfficeId,
  }
}

export const DESTROYING_BRANCH_OFFICE_FAILURE = 'DESTROYING_BRANCH_OFFICE_FAILURE'
export function destroyingBranchOfficeFailure (error) {
  return {
    type: DESTROYING_BRANCH_OFFICE_FAILURE,
    error,
  }
}

export function fetchAndHandleMultipleBranchOffices (currentSubdomain) {
  return async function (dispatch, getState) {
    dispatch(loadingMultipleBranchOffices())
    try {
      const multiplesBranchOffices = await callAPI('/filiais', currentSubdomain)
      dispatch(loadingMultipleBranchOfficesSuccess(multiplesBranchOffices))
    } catch (e) {
      dispatch(loadingMultipleBranchOfficesFailure(e))
    }
  }
}

export function fetchAndHandleBranchOffice (currentSubdomain, branchOfficeId) {
  return async function (dispatch, getState) {
    dispatch(loadingBranchOffice())
    try {
      const branchOffice = await callAPI(`/filiais/${branchOfficeId}`, currentSubdomain)
      dispatch(loadingBranchOfficeSuccess(branchOffice))
      return branchOffice
    } catch (e) {
      dispatch(loadingBranchOfficeFailure(e))
      return null
    }
  }
}

export function handleCreateBranchOffice (currentSubdomain, newBranchOffice) {
  return async function (dispatch, getState) {
    dispatch(creatingBranchOffice())
    try {
      const createdBranchOffice = await callAPI('/filiais', currentSubdomain, 'POST', newBranchOffice)
      dispatch(creatingBranchOfficeSuccess(createdBranchOffice))
    } catch (e) {
      console.warn(e)
      dispatch(creatingBranchOfficeFailure(e))
    }
  }
}

export function handleUpdateBranchOffice (currentSubdomain, branchOfficeId, newBranchOffice) {
  return async function (dispatch, getState) {
    dispatch(updatingBranchOffice())
    try {
      const updatedBranchOffice = await callAPI(`/filiais/${branchOfficeId}`,
                                        currentSubdomain, 'PUT', newBranchOffice)
      dispatch(updatingBranchOfficeSuccess(updatedBranchOffice))
    } catch (e) {
      dispatch(updatingBranchOfficeFailure(e))
    }
  }
}

export function handleDestroyBranchOffice (currentSubdomain, branchOfficeId) {
  return async function (dispatch, getState) {
    dispatch(destroyingBranchOffice())
    try {
      await callAPI(`/filiais/${branchOfficeId}`, currentSubdomain, 'DELETE')
      dispatch(destroyingBranchOfficeSuccess(branchOfficeId))
      return true
    } catch (e) {
      dispatch(destroyingBranchOfficeFailure(e))
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

export default function branchOffices (state = initialState, action) {
  switch (action.type) {

    case LOADING_MULTIPLE_BRANCH_OFFICES :
    case LOADING_BRANCH_OFFICE :
    case CREATING_BRANCH_OFFICE :
    case UPDATING_BRANCH_OFFICE :
      return state.mergeIn(['status', 'isLoading'], true)

    case LOADING_MULTIPLE_BRANCH_OFFICES_FAILURE :
    case LOADING_BRANCH_OFFICE_FAILURE :
    case CREATING_BRANCH_OFFICE_FAILURE :
    case UPDATING_BRANCH_OFFICE_FAILURE :
    case DESTROYING_BRANCH_OFFICE_FAILURE :
      return state.mergeIn(['status', 'errors'], action.error)

    case LOADING_MULTIPLE_BRANCH_OFFICES_SUCCESS :
      action.multiplesBranchOffices.forEach((branchOffice) => {
        state = state.merge({[branchOffice.id]: branchOffice})
      })
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        }
      })

    case LOADING_BRANCH_OFFICE_SUCCESS :
    case CREATING_BRANCH_OFFICE_SUCCESS :
    case UPDATING_BRANCH_OFFICE_SUCCESS :
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        },
        [action.branchOffice.id]: action.branchOffice
      })

    case DESTROYING_BRANCH_OFFICE_SUCCESS :
      state = state.delete(action.branchOfficeId)
      return state.mergeDeep({status: {isLoading: false, errors: ''}})

    default :
      return state
  }
}
