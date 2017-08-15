import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Home, Loading } from '../../components'
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
    if (this.props.isAuthenticated) {
      return <Redirect to='/account' />
    } else if (this.props.isAuthenticating) {
      return <Loading />
    } else {
      return (
        <Home onOpenLoginModal={() => this.handleOpenLoginModal()}
          onOpenRegisterModal={() => this.handleOpenRegisterModal()} />
      )
    }
  }
}

function mapStateToProps ({navBar, user}) {
  return {
    isAuthenticated: user.get('isAuthenticated'),
    isAuthenticating: user.get('isAuthenticating'),
  }
}

export default connect(mapStateToProps)(HomeContainer)
