import React, { Component } from 'react'
import { Login } from '../../components'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authenticate } from '../../redux/modules/user'
import { closeModal } from '../../redux/modules/modal'
import { showSnackbar } from '../../redux/modules/snackbar'

class LoginContainer extends Component {

  async handleLogin (credentials) {
    this.props.closeModal()
    if (await this.props.authenticate(credentials)) {
      this.props.showSnackbar('Logado com sucesso')
    } else {
      this.props.showSnackbar('Não foi possível logar-se. Tente novamente.')
    }
  }

  render () {
    return (
      <Login onSubmit={(credentials) => this.handleLogin(credentials)} />
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...{authenticate},
    ...{showSnackbar},
    ...{closeModal},
  }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(LoginContainer))
