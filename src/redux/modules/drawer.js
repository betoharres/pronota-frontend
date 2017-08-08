import { Map } from 'immutable'

export const OPEN_DRAWER = 'OPEN_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'

export function openDrawer () {
  return {
    type: OPEN_DRAWER,
  }
}

export function closeDrawer () {
  return {
    type: CLOSE_DRAWER,
  }
}

const initialState = Map({
  isOpen: false
})

export default function drawer (state = initialState, action) {
  switch (action.type) {
    case OPEN_DRAWER :
      return state.merge({isOpen: true})
    case CLOSE_DRAWER :
      return state.merge({isOpen: false})

    default:
      return state
  }
}
