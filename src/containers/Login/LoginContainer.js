import React, { Component } from 'react'
import { Login } from '../../components'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAndHandleMultipleCompanies } from '../../redux/modules/companies'
import { authenticate } from '../../redux/modules/user'
import { closeModal } from '../../redux/modules/modal'

class LoginContainer extends Component {

  async handleLogin (credentials) {
    this.props.dispatch(closeModal())
    const user = await this.props.dispatch(authenticate(credentials))
  }

  render () {
    return (
      <Login onSubmit={(credentials) => this.handleLogin(credentials)} />
    )
  }
}

export default withRouter(connect()(LoginContainer))
