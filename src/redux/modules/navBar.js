import { Map } from 'immutable'

const SET_NAVBAR_TITLE = 'SET_NAVBAR_TITLE'

export function setNavBarTitle (text) {
  return {
    type: SET_NAVBAR_TITLE,
    text,
  }
}

const initialState = Map({
  title: ''
})

export default function navBar (state = initialState, action) {
  switch (action.type) {
    case SET_NAVBAR_TITLE :
      return state.merge({title: action.text})
    default :
      return state
  }
}
