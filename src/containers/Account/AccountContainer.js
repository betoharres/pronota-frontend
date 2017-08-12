import React, { Component } from 'react'
import { Account } from '../../components'

import { connect } from 'react-redux'
import { requestLogoutUser } from '../../redux/modules/user'
import { setNavBarTitle } from '../../redux/modules/navBar'

class AccountContainer extends Component {

  componentDidMount () {
    this.props.dispatch(setNavBarTitle('Minha Conta'))
  }

  async handleLogout () {
    if(await this.props.dispatch(requestLogoutUser())) {
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <Account openModal={(e) => this.openModal(e)}
        onLogout={() => this.handleLogout()} />
    )
  }
}

export default connect()(AccountContainer)
