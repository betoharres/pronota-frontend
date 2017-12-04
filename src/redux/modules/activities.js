import { fromJS } from 'immutable'
import { LOGOUT_USER } from './user'
import { callAPI } from '../../utils'

export const LOADING_MULTIPLE_ACTIVITIES = 'LOADING_MULTIPLE_ACTIVITIES'
export function loadingMultipleActivities () {
  return {
    type: LOADING_MULTIPLE_ACTIVITIES,
  }
}

export const LOADING_MULTIPLE_ACTIVITIES_SUCCESS = 'LOADING_MULTIPLE_ACTIVITIES_SUCCESS'
export function loadingMultipleActivitiesSuccess (activities) {
  return {
    type: LOADING_MULTIPLE_ACTIVITIES_SUCCESS,
    activities,
  }
}

export const LOADING_MULTIPLE_ACTIVITIES_FAILURE = 'LOADING_MULTIPLE_ACTIVITIES_FAILURE'
export function loadingMultipleActivitiesFailure (error) {
  return {
    type: LOADING_MULTIPLE_ACTIVITIES_FAILURE,
    error,
  }
}

export const LOADING_ACTIVITY = 'LOADING_ACTIVITY'
export function loadingActivity () {
  return {
    type: LOADING_ACTIVITY,
  }
}

export const LOADING_ACTIVITY_SUCCESS = 'LOADING_ACTIVITY_SUCCESS'
export function loadingActivitySuccess (activity) {
  return {
    type: LOADING_ACTIVITY_SUCCESS,
    activity,
  }
}

export const LOADING_ACTIVITY_FAILURE = 'LOADING_ACTIVITY_FAILURE'
export function loadingActivityFailure (error) {
  return {
    type: LOADING_ACTIVITY_FAILURE,
    error,
  }
}

export const CREATING_ACTIVITY = 'CREATING_ACTIVITY'
export function creatingActivity () {
  return {
    type: CREATING_ACTIVITY,
  }
}

export const CREATING_ACTIVITY_SUCCESS = 'CREATING_ACTIVITY_SUCCESS'
export function creatingActivitySuccess (activity) {
  return {
    type: CREATING_ACTIVITY_SUCCESS,
    activity,
  }
}

export const CREATING_ACTIVITY_FAILURE = 'CREATING_ACTIVITY_FAILURE'
export function creatingActivityFailure (error) {
  return {
    type: CREATING_ACTIVITY_FAILURE,
    error,
  }
}

export const UPDATING_ACTIVITY = 'UPDATING_ACTIVITY'
export function updatingActivity () {
  return {
    type: UPDATING_ACTIVITY,
  }
}

export const UPDATING_ACTIVITY_SUCCESS = 'UPDATING_ACTIVITY_SUCCESS'
export function updatingActivitySuccess (activity) {
  return {
    type: UPDATING_ACTIVITY_SUCCESS,
    activity
  }
}

export const UPDATING_ACTIVITY_FAILURE = 'UPDATING_ACTIVITY_FAILURE'
export function updatingActivityFailure (error) {
  return {
    type: UPDATING_ACTIVITY_FAILURE,
    error,
  }
}

export const DESTROYING_ACTIVITY = 'DESTROYING_ACTIVITY'
export function destroyingActivity () {
  return {
    type: DESTROYING_ACTIVITY,
  }
}

export const DESTROYING_ACTIVITY_SUCCESS = 'DESTROYING_ACTIVITY_SUCCESS'
export function destroyingActivitySuccess (activityId) {
  return {
    type: DESTROYING_ACTIVITY_SUCCESS,
    activityId,
  }
}

export const DESTROYING_ACTIVITY_FAILURE = 'DESTROYING_ACTIVITY_FAILURE'
export function destroyingActivityFailure (error) {
  return {
    type: DESTROYING_ACTIVITY_FAILURE,
    error,
  }
}

export function fetchAndHandleMultipleActivities () {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(loadingMultipleActivities())
    try {
      const activities = await callAPI('/activities', currentSubdomain)
      dispatch(loadingMultipleActivitiesSuccess(activities))
      return activities
    } catch (e) {
      dispatch(loadingMultipleActivitiesFailure(e))
      return null
    }
  }
}

export function fetchAndHandleActivity (activityId) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(loadingActivity())
    try {
      const activity = await callAPI(`/activities/${activityId}`, currentSubdomain)
      dispatch(loadingActivitySuccess(activity))
      return activity
    } catch (e) {
      dispatch(loadingActivityFailure(e))
      return null
    }
  }
}

export function handleCreateActivity (newActivity) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(creatingActivity())
    try {
      const createdActivity = await callAPI('/activities', currentSubdomain, 'POST', newActivity)
      dispatch(creatingActivitySuccess(createdActivity))
      return createdActivity
    } catch (e) {
      dispatch(creatingActivityFailure(e))
      return null
    }
  }
}

export function handleUpdateActivity (activityId, newActivity) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(updatingActivity())
    try {
      const updatedActivity = await callAPI(`/activities/${activityId}`,
                                            currentSubdomain, 'PUT', newActivity)
      dispatch(updatingActivitySuccess(updatedActivity))
      return updatedActivity
    } catch (e) {
      dispatch(updatingActivityFailure(e))
      return null
    }
  }
}

export function handleDestroyActivity (activityId) {
  return async function (dispatch, getState) {
    const currentSubdomain = getState().user.get('currentSubdomain')
    dispatch(destroyingActivity())
    try {
      await callAPI(`/activities/${activityId}`, currentSubdomain, 'DELETE')
      dispatch(destroyingActivitySuccess(activityId))
      return true
    } catch (e) {
      dispatch(destroyingActivityFailure(e))
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

export default function activities (state = initialState, action) {
  switch (action.type) {

    case LOADING_MULTIPLE_ACTIVITIES :
    case LOADING_ACTIVITY :
    case CREATING_ACTIVITY :
    case UPDATING_ACTIVITY :
      return state.mergeIn(['status', 'isLoading'], true)

    case LOADING_MULTIPLE_ACTIVITIES_FAILURE :
    case LOADING_ACTIVITY_FAILURE :
    case CREATING_ACTIVITY_FAILURE :
    case UPDATING_ACTIVITY_FAILURE :
    case DESTROYING_ACTIVITY_FAILURE :
        return state.mergeIn(['status', 'errors'], action.error)

    case LOADING_MULTIPLE_ACTIVITIES_SUCCESS :
      action.activities.forEach((activity) => {
        state = state.merge({[activity.id]: activity})
      })
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        }
      })

    case LOADING_ACTIVITY_SUCCESS :
    case CREATING_ACTIVITY_SUCCESS :
    case UPDATING_ACTIVITY_SUCCESS :
      return state.mergeDeep({
        status: {
          isLoading: false,
          errors: '',
          lastUpdated: new Date().getTime(),
        },
        [action.activity.id]: action.activity
      })

    case DESTROYING_ACTIVITY_SUCCESS :
      state = state.delete(action.activityId.toString())
      return state.mergeDeep({status: {isLoading: false, errors: ''}})

    case LOGOUT_USER :
      return initialState

    default :
      return state
  }
}
