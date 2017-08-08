import { fromJS } from 'immutable'
import { callAPI } from '../../utils'

export const LOADING_MULTIPLE_CLIENTS = 'LOADING_MULTIPLE_CLIENTS'
export function loadingMultipleClients () {
  return {
    type: LOADING_MULTIPLE_CLIENTS,
  }
}

export const LOADING_MULTIPLE_CLIENTS_SUCCESS = 'LOADING_MULTIPLE_CLIENTS_SUCCESS'
export function loadingMultipleClientsSuccess (multiplesClients) {
  return {
    type: LOADING_MULTIPLE_CLIENTS_SUCCESS,
    multiplesClients,
  }
}

export const LOADING_MULTIPLE_CLIENTS_FAILURE = 'LOADING_MULTIPLE_CLIENTS_FAILURE'
export function loadingMultipleClientsFailure (error) {
  return {
    type: LOADING_MULTIPLE_CLIENTS_FAILURE,
    error,
  }
}

export const LOADING_CLIENT = 'LOADING_CLIENT'
export function loadingClient () {
  return {
    type: LOADING_CLIENT,
  }
}

export const LOADING_CLIENT_SUCCESS = 'LOADING_CLIENT_SUCCESS'
export function loadingClientSuccess (client) {
  return {
    type: LOADING_CLIENT_SUCCESS,
    client,
  }
}

export const LOADING_CLIENT_FAILURE = 'LOADING_CLIENT_FAILURE'
export function loadingClientFailure (error) {
  return {
    type: LOADING_CLIENT_FAILURE,
    error,
  }
}

export const CREATING_CLIENT = 'CREATING_CLIENT'
export function creatingClient () {
  return {
    type: CREATING_CLIENT,
  }
}

export const CREATING_CLIENT_SUCCESS = 'CREATING_CLIENT_SUCCESS'
export function creatingClientSuccess (client) {
  return {
    type: CREATING_CLIENT_SUCCESS,
    client,
  }
}

export const CREATING_CLIENT_FAILURE = 'CREATING_CLIENT_FAILURE'
export function creatingClientFailure (error) {
  return {
    type: CREATING_CLIENT_FAILURE,
    error,
  }
}

export const UPDATING_CLIENT = 'UPDATING_CLIENT'
export function updatingClient () {
  return {
    type: UPDATING_CLIENT,
  }
}

export const UPDATING_CLIENT_SUCCESS = 'UPDATING_CLIENT_SUCCESS'
export function updatingClientSuccess (client) {
  return {
    type: UPDATING_CLIENT_SUCCESS,
    client
  }
}

export const UPDATING_CLIENT_FAILURE = 'UPDATING_CLIENT_FAILURE'
export function updatingClientFailure (error) {
  return {
    type: UPDATING_CLIENT_FAILURE,
    error,
  }
}

export const DESTROYING_CLIENT = 'DESTROYING_CLIENT'
export function destroyingClient () {
  return {
    type: DESTROYING_CLIENT,
  }
}

export const DESTROYING_CLIENT_SUCCESS = 'DESTROYING_CLIENT_SUCCESS'
export function destroyingClientSuccess (clientId) {
  return {
    type: DESTROYING_CLIENT_SUCCESS,
    clientId,
  }
}

export const DESTROYING_CLIENT_FAILURE = 'DESTROYING_CLIENT_FAILURE'
export function destroyingClientFailure (error) {
  return {
    type: DESTROYING_CLIENT_FAILURE,
    error,
  }
}

export function fetchAndHandleMultipleClients (currentSubdomain) {
  return async function (dispatch, getState) {
    dispatch(loadingMultipleClients())
    try {
      const multiplesClients = await callAPI('/clientes', currentSubdomain)
      dispatch(loadingMultipleClientsSuccess(multiplesClients))
    } catch (e) {
      dispatch(loadingMultipleClientsFailure(e))
    }
  }
}

export function fetchAndHandleClient (currentSubdomain, clientId) {
  return async function (dispatch, getState) {
    dispatch(loadingClient())
    try {
      const client = await callAPI(`/clientes/${clientId}`, currentSubdomain)
      dispatch(loadingClientSuccess(client))
      return client
    } catch (e) {
      dispatch(loadingClientFailure(e))
      return null
    }
  }
}

export function handleCreateClient (currentSubdomain, newClient) {
  return async function (dispatch, getState) {
    dispatch(creatingClient())
    try {
      const createdClient = await callAPI('/clientes', currentSubdomain, 'POST', newClient)
      dispatch(creatingClientSuccess(createdClient))
    } catch (e) {
      dispatch(creatingClientFailure(e))
    }
  }
}

export function handleUpdateClient (currentSubdomain, clientId, newClient) {
  return async function (dispatch, getState) {
    dispatch(updatingClient())
    try {
      const updatedClient = await callAPI(`/clientes/${clientId}`, currentSubdomain, 'PUT', newClient)
      dispatch(updatingClientSuccess(updatedClient))
    } catch (e) {
      dispatch(updatingClientFailure(e))
    }
  }
}

export function handleDestroyClient (currentSubdomain, clientId) {
  return async function (dispatch, getState) {
    dispatch(destroyingClient())
    try {
      await callAPI(`/clientes/${clientId}`, currentSubdomain, 'DELETE')
      dispatch(destroyingClientSuccess(clientId))
      return true
    } catch (e) {
      dispatch(destroyingClientFailure(e))
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

export default function clients (state = initialState, action) {
  switch (action.type) {

    case LOADING_MULTIPLE_CLIENTS :
    case LOADING_CLIENT :
    case CREATING_CLIENT :
    case UPDATING_CLIENT :
      return state.mergeIn(['status', 'isLoading'], true)

    case LOADING_MULTIPLE_CLIENTS_FAILURE :
    case LOADING_CLIENT_FAILURE :
    case CREATING_CLIENT_FAILURE :
    case UPDATING_CLIENT_FAILURE :
    case DESTROYING_CLIENT_FAILURE :
      return state.mergeIn(['status', 'errors'], action.error)

    case LOADING_MULTIPLE_CLIENTS_SUCCESS :
      action.multiplesClients.forEach((client) => {
        state = state.merge({[client.id]: client})
      })
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        }
      })

    case LOADING_CLIENT_SUCCESS :
    case CREATING_CLIENT_SUCCESS :
    case UPDATING_CLIENT_SUCCESS :
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        },
        [action.client.id]: action.client
      })

    case DESTROYING_CLIENT_SUCCESS :
      state = state.delete(action.clientId)
      return state.mergeDeep({status: {isLoading: false, errors: ''}})

    default :
      return state
  }
}
