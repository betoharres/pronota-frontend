import React, { Component } from 'react'
import { Register } from '../../components'

import { connect } from 'react-redux'
import { setNavBarTitle } from '../../redux/modules/navBar'
import { handleRegisterUser } from '../../redux/modules/user'

class RegisterContainer extends Component {

  componentDidMount () {
    this.props.dispatch(setNavBarTitle('Register'))
  }

  async handleUserRegistration (credentials) {
    await this.props.dispatch(handleRegisterUser(credentials))
      // ? this.context.router.push('/') : null
  }

  render () {
    return (
      <Register onSubmit={(credentials) => this.handleUserRegistration(credentials)} />
    )
  }
}

export default connect()(RegisterContainer)
