import React, { Component } from 'react'
import { Account } from '../../components'

import { connect } from 'react-redux'
import { setNavBarTitle } from '../../redux/modules/navBar'
import { fetchAndHandleUserRole, handleDeleteUser } from '../../redux/modules/user'
import { showSnackbar } from '../../redux/modules/snackbar'

class AccountContainer extends Component {

  async componentDidMount () {
    await this.props.dispatch(setNavBarTitle('Minha Conta'))
    await this.props.dispatch(fetchAndHandleUserRole())
  }

  async handleDeleteAccountClick () {
    await this.props.dispatch(handleDeleteUser())
      ? this.props.dispatch(showSnackbar('Conta deletada com sucesso'))
      : this.props.dispatch(showSnackbar('Não foi possível deletar sua conta'))
  }

  render () {
    return (
      <Account
        user={this.props.user}
        role={this.props.role}
        onDeleteAccountClick={() => this.handleDeleteAccountClick()}
        redirectToCompany={(companyId) => this.redirectToCompany(companyId)} />
    )
  }
}

function mapStateToProps ({user}) {
  return {
    user: user.get('info'),
    role: user.getIn(['role', 'info']),
    isLoadingRole: user.getIn(['role', 'isLoading']),
  }
}

export default connect(mapStateToProps)(AccountContainer)
