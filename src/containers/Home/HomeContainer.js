import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
    if (this.props.isAuthenticated) {
      if (this.props.companiesCount > 0) {
        return  <Redirect to='/account' />
      } else {
        return <Redirect to='/companies/new' />
      }
    } else {
      return (
        <Home onOpenLoginModal={() => this.handleOpenLoginModal()}
          onOpenRegisterModal={() => this.handleOpenRegisterModal()} />
      )
    }
  }
}

function mapStateToProps ({navBar, user, companies}) {
  return {
    companiesCount: companies.delete('status').size,
    isLoadingCompanies: companies.getIn(['status', 'isLoading']),
    isAuthenticated: user.get('isAuthenticated'),
    isAuthenticating: user.get('isAuthenticating'),
  }
}

export default connect(mapStateToProps)(HomeContainer)
