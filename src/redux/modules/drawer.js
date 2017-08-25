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

export const SET_HAS_SMALL_SCREEN = 'SET_HAS_SMALL_SCREEN'
export function setHasSmallScreen (hasSmallScreen) {
  return {
    type: SET_HAS_SMALL_SCREEN,
    hasSmallScreen,
  }
}

const initialState = Map({
  isOpen: false,
  hasSmallScreen: false,
})

export function shouldDockDrawer (width) {
  return async function (dispatch) {
    const hasSmallScreen = width < 1024
    if (hasSmallScreen) {
      dispatch(closeDrawer())
      dispatch(setHasSmallScreen(true))
    } else {
      dispatch(openDrawer())
      dispatch(setHasSmallScreen(false))
    }
  }
}

export default function drawer (state = initialState, action) {
  switch (action.type) {
    case OPEN_DRAWER :
      return state.merge({isOpen: true})
    case CLOSE_DRAWER :
      return state.merge({isOpen: false})
    case SET_HAS_SMALL_SCREEN :
      return state.merge({hasSmallScreen: action.hasSmallScreen})
    default:
      return state
  }
}
