import React, { Component } from 'react'
import { Login } from '../../components'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAndHandleMultipleCompanies } from '../../redux/modules/companies'
import { setNavBarTitle } from '../../redux/modules/navBar'
import { authenticate } from '../../redux/modules/user'
import { closeModal } from '../../redux/modules/modal'

class LoginContainer extends Component {

  componentDidMount () {
    this.props.dispatch(setNavBarTitle('Login'))
  }

  async handleLogin (credentials) {
    this.props.dispatch(closeModal())
    const user = await this.props.dispatch(authenticate(credentials))
    if (user) {
      await this.props.dispatch(fetchAndHandleMultipleCompanies())
    } else {
      console.log('Not logged in')
    }
  }

  render () {
    return (
      <Login onSubmit={(credentials) => this.handleLogin(credentials)} />
    )
  }
}

export default withRouter(connect()(LoginContainer))
