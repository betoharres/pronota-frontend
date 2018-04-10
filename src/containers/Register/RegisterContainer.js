import React, { Component } from 'react'
import { Register } from '../../components'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { handleRegisterUser } from '../../redux/modules/user'
import { closeModal } from '../../redux/modules/modal'
import { showSnackbar } from '../../redux/modules/snackbar'

class RegisterContainer extends Component {

  async handleUserRegistration (credentials) {
    if (await this.props.handleRegisterUser(credentials)) {
      this.props.showSnackbar('Registrado com sucesso. Verifique seu e-mail.')
    } else {
      this.props.showSnackbar('Não foi possível registrar-se.')
    }
    this.props.closeModal()
  }

  render () {
    return (
      <Register onSubmit={(credentials) => this.handleUserRegistration(credentials)} />
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...{showSnackbar},
    ...{handleRegisterUser},
    ...{closeModal},
  }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(RegisterContainer))
