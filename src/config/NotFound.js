import React  from 'react'
import { Loading } from '../components'
import { HomeContainer } from '../containers'
import { Route } from 'react-router-dom'

const NotFound = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => {
    if (rest.isAuthenticating) {
      return <Loading />
    } else {
      return <Component {...props} />
    }
  }} />
}
export default NotFound
