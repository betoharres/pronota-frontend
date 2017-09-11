import React, { Component } from 'react'
import { Home } from '../../components'
import { LoginContainer, RegisterContainer } from '../../containers'
import { connect } from 'react-redux'
import { openModal } from '../../redux/modules/modal'

class HomeContainer extends Component {

  handleOpenLoginModal () {
    this.props.dispatch(openModal(LoginContainer))
  }

  handleOpenRegisterModal () {
    this.props.dispatch(openModal(RegisterContainer))
  }

  render () {
    return (
      <Home onOpenLoginModal={() => this.handleOpenLoginModal()}
        onOpenRegisterModal={() => this.handleOpenRegisterModal()} />
    )
  }
}

export default connect()(HomeContainer)
