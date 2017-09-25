import React, { Component } from 'react'
import { Register } from '../../components'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleRegisterUser } from '../../redux/modules/user'
import { closeModal } from '../../redux/modules/modal'

class RegisterContainer extends Component {

  async handleUserRegistration (credentials) {
    await this.props.dispatch(handleRegisterUser(credentials))
    this.props.dispatch(closeModal())
  }

  render () {
    return (
      <Register onSubmit={(credentials) => this.handleUserRegistration(credentials)} />
    )
  }
}

export default withRouter(connect()(RegisterContainer))
