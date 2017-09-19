import { fromJS, Map } from 'immutable'
import { LOGOUT_USER } from './user'
import { callAPI } from '../../utils'

export const LOADING_MULTIPLE_CERTIFICATES = 'LOADING_MULTIPLE_CERTIFICATES'
export function loadingMultipleCertificates () {
  return {
    type: LOADING_MULTIPLE_CERTIFICATES,
  }
}

export const LOADING_MULTIPLE_CERTIFICATES_SUCCESS = 'LOADING_MULTIPLE_CERTIFICATES_SUCCESS'
export function loadingMultipleCertificatesSuccess (multiplesCertificates) {
  return {
    type: LOADING_MULTIPLE_CERTIFICATES_SUCCESS,
    multiplesCertificates,
  }
}

export const LOADING_MULTIPLE_CERTIFICATES_FAILURE = 'LOADING_MULTIPLE_CERTIFICATES_FAILURE'
export function loadingMultipleCertificatesFailure (error) {
  return {
    type: LOADING_MULTIPLE_CERTIFICATES_FAILURE,
    error,
  }
}

export const LOADING_CERTIFICATE = 'LOADING_CERTIFICATE'
export function loadingCertificate () {
  return {
    type: LOADING_CERTIFICATE,
  }
}

export const LOADING_CERTIFICATE_SUCCESS = 'LOADING_CERTIFICATE_SUCCESS'
export function loadingCertificateSuccess (certificate) {
  return {
    type: LOADING_CERTIFICATE_SUCCESS,
    certificate,
  }
}

export const LOADING_CERTIFICATE_FAILURE = 'LOADING_CERTIFICATE_FAILURE'
export function loadingCertificateFailure (error) {
  return {
    type: LOADING_CERTIFICATE_FAILURE,
    error,
  }
}

export const CREATING_CERTIFICATE = 'CREATING_CERTIFICATE'
export function creatingCertificate () {
  return {
    type: CREATING_CERTIFICATE,
  }
}

export const CREATING_CERTIFICATE_SUCCESS = 'CREATING_CERTIFICATE_SUCCESS'
export function creatingCertificateSuccess (certificate) {
  return {
    type: CREATING_CERTIFICATE_SUCCESS,
    certificate,
  }
}

export const CREATING_CERTIFICATE_FAILURE = 'CREATING_CERTIFICATE_FAILURE'
export function creatingCertificateFailure (error) {
  return {
    type: CREATING_CERTIFICATE_FAILURE,
    error,
  }
}

export const UPDATING_CERTIFICATE = 'UPDATING_CERTIFICATE'
export function updatingCertificate () {
  return {
    type: UPDATING_CERTIFICATE,
  }
}

export const UPDATING_CERTIFICATE_SUCCESS = 'UPDATING_CERTIFICATE_SUCCESS'
export function updatingCertificateSuccess (certificate) {
  return {
    type: UPDATING_CERTIFICATE_SUCCESS,
    certificate
  }
}

export const UPDATING_CERTIFICATE_FAILURE = 'UPDATING_CERTIFICATE_FAILURE'
export function updatingCertificateFailure (error) {
  return {
    type: UPDATING_CERTIFICATE_FAILURE,
    error,
  }
}

export const DESTROYING_CERTIFICATE = 'DESTROYING_CERTIFICATE'
export function destroyingCertificate () {
  return {
    type: DESTROYING_CERTIFICATE,
  }
}

export const DESTROYING_CERTIFICATE_SUCCESS = 'DESTROYING_CERTIFICATE_SUCCESS'
export function destroyingCertificateSuccess (certificateId) {
  return {
    type: DESTROYING_CERTIFICATE_SUCCESS,
    certificateId,
  }
}

export const DESTROYING_CERTIFICATE_FAILURE = 'DESTROYING_CERTIFICATE_FAILURE'
export function destroyingCertificateFailure (error) {
  return {
    type: DESTROYING_CERTIFICATE_FAILURE,
    error,
  }
}

export function fetchAndHandleMultipleCertificates (currentSubdomain) {
  return async function (dispatch, getState) {
    dispatch(loadingMultipleCertificates())
    try {
      const multiplesCertificates = await callAPI('/certificates', currentSubdomain)
      dispatch(loadingMultipleCertificatesSuccess(multiplesCertificates))
    } catch (e) {
      dispatch(loadingMultipleCertificatesFailure(e))
    }
  }
}

export function fetchAndHandleCertificate (currentSubdomain, certificateId) {
  return async function (dispatch, getState) {
    dispatch(loadingCertificate())
    try {
      const certificate = await callAPI(`/certificates/${certificateId}`, currentSubdomain)
      dispatch(loadingCertificateSuccess(certificate))
      return certificate
    } catch (e) {
      dispatch(loadingCertificateFailure(e))
      return null
    }
  }
}

export function handleCreateCertificate (currentSubdomain, newCertificate) {
  return async function (dispatch, getState) {
    dispatch(creatingCertificate())
    try {
      newCertificate = Map(newCertificate)
      const createdCertificate = await callAPI('/certificates', currentSubdomain,
        'POST', newCertificate)
      dispatch(creatingCertificateSuccess(createdCertificate))
    } catch (e) {
      dispatch(creatingCertificateFailure(e))
    }
  }
}

export function handleUpdateCertificate (currentSubdomain, certificateId, newCertificate) {
  return async function (dispatch, getState) {
    dispatch(updatingCertificate())
    try {
      const updatedCertificate = await callAPI(`/certificates/${certificateId}`,
        currentSubdomain, 'PUT', newCertificate)
      dispatch(updatingCertificateSuccess(updatedCertificate))
    } catch (e) {
      dispatch(updatingCertificateFailure(e))
    }
  }
}

export function handleDestroyCertificate (currentSubdomain, certificateId) {
  return async function (dispatch, getState) {
    dispatch(destroyingCertificate())
    try {
      await callAPI(`/certificates/${certificateId}`, currentSubdomain, 'DELETE')
      dispatch(destroyingCertificateSuccess(certificateId))
      return true
    } catch (e) {
      dispatch(destroyingCertificateFailure(e))
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

export default function certificates (state = initialState, action) {
  switch (action.type) {

    case LOADING_MULTIPLE_CERTIFICATES :
    case LOADING_CERTIFICATE :
    case CREATING_CERTIFICATE :
    case UPDATING_CERTIFICATE :
      return state.mergeIn(['status', 'isLoading'], true)

    case LOADING_MULTIPLE_CERTIFICATES_FAILURE :
    case LOADING_CERTIFICATE_FAILURE :
    case CREATING_CERTIFICATE_FAILURE :
    case UPDATING_CERTIFICATE_FAILURE :
    case DESTROYING_CERTIFICATE_FAILURE :
      return state.mergeIn(['status', 'errors'], action.error)

    case LOADING_MULTIPLE_CERTIFICATES_SUCCESS :
      action.multiplesCertificates.forEach((certificate) => {
        state = state.merge({[certificate.id]: certificate})
      })
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        }
      })

    case LOADING_CERTIFICATE_SUCCESS :
    case CREATING_CERTIFICATE_SUCCESS :
    case UPDATING_CERTIFICATE_SUCCESS :
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        },
        [action.certificate.id]: action.certificate
      })

    case DESTROYING_CERTIFICATE_SUCCESS :
      state = state.delete(action.certificateId.toString())
      return state.mergeDeep({status: {isLoading: false, errors: ''}})

    case LOGOUT_USER :
      return initialState

    default :
      return state
  }
}
