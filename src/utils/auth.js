import { API_PROTOCOL, API_DOMAIN, headers } from '../config/constants'
import { parseResponse, paramsToObject } from './parse'

const endpoints = {
  signOutPath:           "/auth/sign_out",
  emailSignInPath:       "/auth/sign_in",
  emailRegistrationPath: "/auth",
  accountUpdatePath:     "/auth",
  accountDeletePath:     "/auth/cancel",
  passwordResetPath:     "/auth/password",
  passwordUpdatePath:    "/auth/password",
  tokenValidationPath:   "/auth/validate_token",
  validateUserEmail:     "/user_info/email_exists",
}

export function getCredentials (headers) {
  const credentialHeaders = {
    'access-token': headers.get('access-token'),
    client: headers.get('client'),
    uid: headers.get('uid'),
    expiry: headers.get('expiry'),
  }
  // if a request to the API happens too close to another, the API will not send the
  // new credential headers, but the last one still validates to a new request.
  return Object.values(credentialHeaders).includes(null) ? null : credentialHeaders
}

export async function login (email, password) {
  const response = await fetch(
    `${API_PROTOCOL}://${API_DOMAIN}${endpoints.emailSignInPath}`, {
    method: 'POST', headers,
    body: JSON.stringify({email, password})
  })
  const parsedResponse = await parseResponse(response)
  if (response.ok) {
    const credentials = getCredentials(response.headers)
    if (!credentials) {throw new Error('Missing credentials at login response.')}
    writeCredentials(credentials)
    const user = parsedResponse.data
    return user
  } else {
    return Promise.reject(parsedResponse.errors)
  }
}

export async function register (email, password, password_confirmation) {
  const response = await fetch(`${API_PROTOCOL}://${API_DOMAIN}${endpoints.emailRegistrationPath}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password,
      password_confirmation,
      confirm_success_url: `${API_PROTOCOL}://${window.location.hostname}`
    })
  })
  const unconfirmedNewUser = await parseResponse(response)
  return unconfirmedNewUser.data
}

export async function validateCredentials () {
  const credentials = readCredentials()
  if (!credentials) { return Promise.reject('No credentials saved locally') }

  const response = await fetch(`${API_PROTOCOL}://${API_DOMAIN}${endpoints.tokenValidationPath}`, {
    method: 'GET',
    headers: {...headers, ...credentials},
  })

  if (response.ok) {
    const newCredentials = getCredentials(response.headers)
    // too many reloads makes the API return empty headers,
    // but current credentials are still valid(sometimes, urgh).
    if (newCredentials) {writeCredentials(newCredentials)}
    // get user data from response
    const { data } = await parseResponse(response)
    return data
  } else {
    // deleteCredentials()
    return Promise.reject('Invalid local token')
  }
}

export function saveQueryCredentials (query) {
  query = paramsToObject(query)
  try {
    const client = query.client_id
    const { uid, expiry, token } = query
    const credentials = {'access-token': token, client, uid, expiry}
    writeCredentials(credentials)
    return true
  } catch (e) {
    console.error('Error saving credentials: ', e)
    return false
  }
}

export async function logout () {
  try {
    const credentials = readCredentials()
    await fetch(`${API_PROTOCOL}://${API_DOMAIN}${endpoints.signOutPath}`, {
      method: 'DELETE',
      headers: {...headers, ...credentials},
    })
    deleteCredentials()
  } catch (e) {
    return Promise.reject('Error requesting logout: ', e)
  }
}

export async function validateUserEmail (email) {
  const response = await fetch(
    `${API_PROTOCOL}://${API_DOMAIN}${endpoints.validateUserEmail}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({user_info: {email}})
  })
  return await parseResponse(response)
}

export function readCredentials () {
  return JSON.parse(localStorage.getItem('default'))
}

export function writeCredentials (credentials) {
  localStorage.setItem('default', JSON.stringify(credentials))
}

export function deleteCredentials () {
  localStorage.removeItem('default')
}
