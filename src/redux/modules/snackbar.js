import { Map } from 'immutable'

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR'
export function showSnackbar (message, duration = 4000) {
  return {
    type: SHOW_SNACKBAR,
    message,
    duration,
  }
}

export const HIDE_SNACKBAR = 'HIDE_SNACKBAR'
export function hideSnackbar () {
  return {
    type: HIDE_SNACKBAR,
  }
}

const initialState = Map({
  isOpen: false,
  duration: 4000,
  message: '',
})

export default function snackbar (state = initialState, {duration, message, type}) {
  switch (type) {

    case SHOW_SNACKBAR :
      return state.merge({isOpen: true, duration, message})

    case HIDE_SNACKBAR :
      return initialState

    default:
      return state
  }
}
