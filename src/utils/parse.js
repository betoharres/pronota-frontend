import { API_PROTOCOL, API_DOMAIN, headers } from '../config/constants'
import { readCredentials, writeCredentials } from './auth'
import { Map, fromJS } from 'immutable'
import { getCredentials } from './auth'

export async function parseResponse (response, cb = () => {}) {
  const json = await response.json()
  if (json && response.status >= 200 && response.status < 300) {
    return parseBodyToCamelCase(json)
  } else {
    cb()
    return Promise.reject(json);
  }
}

export async function callAPI (
  endpoint = '/',
  subdomain,
  method = 'GET',
  body,
  customHeaders
) {

  if (method.match(/POST|PUT|PATCH/) && typeof body === 'undefined') {
    throw new Error(`missing body in ${method} method`)
  }

  const url = `${API_PROTOCOL}://${API_DOMAIN}${endpoint}`

  const credentials = readCredentials()
  if (credentials) {
    let subdomainHeader = {}
    if (subdomain) { subdomainHeader = {Subdomain: subdomain} }
    const request = {...{method}, headers: {
      ...headers, ...customHeaders, ...credentials, ...subdomainHeader}
    }
    if (body && (typeof body !== 'undefined')) {
      request.body = JSON.stringify(parseToSneakCase(body))
    }
    const response = await fetch(url, request)
    const newCredentials = getCredentials(response.headers)
    if (newCredentials) { writeCredentials(newCredentials) }
    return response.status === 204 ? null : await parseResponse(response)
  } else {
    return Promise.reject('Cannot make API call. Missing credentials.')
  }
}

export function parseToSneakCase (immutableObj) {
  const parsedObj = {}
  immutableObj.map((value, key) => {
    // recursive call ( won't catch Object values )
    value = Map.isMap(value) ? parseToSneakCase(value) : value
    const snakeKey = toSnakeCase(key)
    return parsedObj[snakeKey] = value
  })
  return fromJS(parsedObj)
}

// In order to speak JS and Ruby lang, we keep switching from sneak to camel case
export function parseBodyToCamelCase (obj) {
  if (obj instanceof Array) {
    const objList = []
    obj.forEach(objectItem => objList.push(parseToCamelCase(objectItem)))
    return objList
  } else {
    return parseToCamelCase(obj)
  }
}

export function parseToCamelCase (obj) {
  const parsedObj = {}
  Object.keys(obj).forEach((key) => {
    // recursive call
    obj[key] = obj[key] instanceof Object ? parseToCamelCase(obj[key]) : obj[key]
    const camelKey = toCamelCase(key)
    parsedObj[camelKey] = obj[key]
  })
  return parsedObj
}

// fooBar => foo_bar
export function toSnakeCase (string) {
  return string.replace(/[A-Z]/g, (letter) => (`_${letter.toLowerCase()}`))
}

// foo_bar => fooBar
export function toCamelCase (string) {
  return string.replace(/_[a-z]/g, (match) => (`${match.substring(1).toUpperCase()}`))
}

export function parseToAutocomplete (obj, objConfig) {
  obj = obj.delete('status')
  if (obj.size === 0) {return [{}]}

  const parsedObjects = []
  obj.toArray().forEach((item) => (
    parsedObjects.push({[objConfig['id']]: item.get(objConfig['id']),
                        [objConfig['text']]: item.get(objConfig['text'])})
  ))
  return parsedObjects
}

export function paramsToObject (params) {
  params = params.substring(1)
  try {
    params = JSON.parse('{"'
      + decodeURIComponent(params)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g,'":"')
      + '"}')
  } catch (e) {
    return null
  }
  return params
}

export function arrayBufferToBase64 (arrayBuffer) {
  return btoa(new Uint8Array(arrayBuffer)
    .reduce((data, byte) => data + String.fromCharCode(byte), ''))
}
