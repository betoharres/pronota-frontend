import React, { Component } from 'react'
import { Home } from '../../components'
import { LoginContainer, RegisterContainer } from '../../containers'
import { connect } from 'react-redux'
import { openModal } from '../../redux/modules/modal'

class HomeContainer extends Component {

  componentDidMount () {
    if (this.props.notFound === true)
      this.props.dispatch(openModal(() => <span>Página não encontrada ou não autenticado.</span>))
  }

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
