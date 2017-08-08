import { fromJS } from 'immutable'
import { callAPI } from '../../utils'

export const SIGN_OUT_COMPLETE = 'SIGN_OUT_COMPLETE'

export const LOADING_MULTIPLE_COMPANIES = 'LOADING_MULTIPLE_COMPANIES'
export function loadingMultipleCompanies () {
  return {
    type: LOADING_MULTIPLE_COMPANIES,
  }
}

export const LOADING_MULTIPLE_COMPANIES_SUCCESS = 'LOADING_MULTIPLE_COMPANIES_SUCCESS'
export function loadingMultipleCompaniesSuccess (multipleCompanies) {
  return {
    type: LOADING_MULTIPLE_COMPANIES_SUCCESS,
    multipleCompanies,
  }
}

export const LOADING_MULTIPLE_COMPANIES_FAILURE = 'LOADING_MULTIPLE_COMPANIES_FAILURE'
export function loadingMultipleCompaniesFailure (error) {
  return {
    type: LOADING_MULTIPLE_COMPANIES_FAILURE,
    error,
  }
}

export const LOADING_COMPANY = 'LOADING_COMPANY'
export function loadingCompany () {
  return {
    type: LOADING_COMPANY,
  }
}

export const LOADING_COMPANY_SUCCESS = 'LOADING_COMPANY_SUCCESS'
export function loadingCompanySuccess (company) {
  return {
    type: LOADING_COMPANY_SUCCESS,
    company,
  }
}

export const LOADING_COMPANY_FAILURE = 'LOADING_COMPANY_FAILURE'
export function loadingCompanyFailure (error) {
  return {
    type: LOADING_COMPANY_FAILURE,
    error,
  }
}

export const CREATING_COMPANY = 'CREATING_COMPANY'
export function creatingCompany () {
  return {
    type: CREATING_COMPANY,
  }
}

export const CREATING_COMPANY_SUCCESS = 'CREATING_COMPANY_SUCCESS'
export function creatingCompanySuccess (company) {
  return {
    type: CREATING_COMPANY_SUCCESS,
    company,
  }
}

export const CREATING_COMPANY_FAILURE = 'CREATING_COMPANY_FAILURE'
export function creatingCompanyFailure (error) {
  return {
    type: CREATING_COMPANY_FAILURE,
    error,
  }
}

export const UPDATING_COMPANY = 'UPDATING_COMPANY'
export function updatingCompany () {
  return {
    type: UPDATING_COMPANY,
  }
}

export const UPDATING_COMPANY_SUCCESS = 'UPDATING_COMPANY_SUCCESS'
export function updatingCompanySuccess (company) {
  return {
    type: UPDATING_COMPANY_SUCCESS,
    company
  }
}

export const UPDATING_COMPANY_FAILURE = 'UPDATING_COMPANY_FAILURE'
export function updatingCompanyFailure (error) {
  return {
    type: UPDATING_COMPANY_FAILURE,
    error,
  }
}

export const DESTROYING_COMPANY = 'DESTROYING_COMPANY'
export function destroyingCompany () {
  return {
    type: DESTROYING_COMPANY,
  }
}

export const DESTROYING_COMPANY_SUCCESS = 'DESTROYING_COMPANY_SUCCESS'
export function destroyingCompanySuccess (companyId) {
  return {
    type: DESTROYING_COMPANY_SUCCESS,
    companyId,
  }
}

export const DESTROYING_COMPANY_FAILURE = 'DESTROYING_COMPANY_FAILURE'
export function destroyingCompanyFailure (error) {
  return {
    type: DESTROYING_COMPANY_FAILURE,
    error,
  }
}

export function fetchAndHandleMultipleCompanies () {
  return async function (dispatch, getState) {
    dispatch(loadingMultipleCompanies())
    try {
      const multipleCompanies = await callAPI('/companies')
      dispatch(loadingMultipleCompaniesSuccess(multipleCompanies))
    } catch (e) {
      dispatch(loadingMultipleCompaniesFailure(e))
    }
  }
}

export function fetchAndHandleCompany (companyId) {
  return async function (dispatch, getState) {
    dispatch(loadingCompany())
    try {
      const company = await callAPI(`/companies/${companyId}`)
      dispatch(loadingCompanySuccess(company))
    } catch (e) {
      console.warn(e)
      dispatch(loadingCompanyFailure(e))
    }
  }
}

export function handleCreateCompany (newCompany) {
  return async function (dispatch, getState) {
    dispatch(creatingCompany())
    try {
      const createdCompany = await callAPI('/companies', '', 'POST', newCompany)
      dispatch(creatingCompanySuccess(createdCompany))
    } catch (e) {
      console.warn(e)
      dispatch(creatingCompanyFailure(e))
    }
  }
}

export function handleUpdateCompany (companyId, newCompany) {
  return async function (dispatch, getState) {
    dispatch(updatingCompany())
    try {
      const updatedCompany = await callAPI(`/companies/${companyId}`, '', 'PUT', newCompany)
      dispatch(updatingCompanySuccess(updatedCompany))
    } catch (e) {
      console.warn(e)
      dispatch(updatingCompanyFailure(e))
    }
  }
}

export function handleDestroyCompany (companyId) {
  return async function (dispatch, getState) {
    dispatch(destroyingCompany())
    try {
      await callAPI(`/companies/${companyId}`, '', 'DELETE')
      dispatch(destroyingCompanySuccess(companyId))
      return true
    } catch (e) {
      dispatch(destroyingCompanyFailure(e))
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

export default function companies (state = initialState, action) {
  switch (action.type) {

    case LOADING_MULTIPLE_COMPANIES :
    case LOADING_COMPANY :
    case CREATING_COMPANY :
    case UPDATING_COMPANY :
      return state.mergeIn(['status', 'isLoading'], true)

    case LOADING_MULTIPLE_COMPANIES_FAILURE :
    case LOADING_COMPANY_FAILURE :
    case CREATING_COMPANY_FAILURE :
    case UPDATING_COMPANY_FAILURE :
    case DESTROYING_COMPANY_FAILURE :
      return state.mergeIn(['status', 'errors'], action.error)

    case LOADING_MULTIPLE_COMPANIES_SUCCESS :
      action.multipleCompanies.forEach((company) => {
        state = state.merge({[company.id]: company})
      })
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        }
      })

    case LOADING_COMPANY_SUCCESS :
    case CREATING_COMPANY_SUCCESS :
    case UPDATING_COMPANY_SUCCESS :
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        },
        [action.company.id]: action.company
      })

    case DESTROYING_COMPANY_SUCCESS :
      state = state.delete(action.companyId)
      return state.mergeDeep({status: {isLoading: false, errors: ''}})

    case SIGN_OUT_COMPLETE :
      return initialState

    default :
      return state
  }
}
